-- Crypto Pulse — public.profiles (run in Supabase → SQL Editor)
--
-- auth.users: email + encrypted password (Authentication → Users)
-- public.profiles: display_name + virtual USD (Table Editor)

-- Column for app virtual balance [P-03]
alter table public.profiles
  add column if not exists cash_balance_usd numeric(18, 2) not null default 10000.00;

comment on column public.profiles.cash_balance_usd is 'Virtual USD for mock trading [P-03]';

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, cash_balance_usd)
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data->>'display_name'), ''),
      split_part(coalesce(new.email, ''), '@', 1),
      'User'
    ),
    10000.00
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill existing auth users missing a profile row
insert into public.profiles (id, display_name, cash_balance_usd)
select
  u.id,
  coalesce(
    nullif(trim(u.raw_user_meta_data->>'display_name'), ''),
    split_part(coalesce(u.email, ''), '@', 1),
    'User'
  ),
  10000.00
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id);

-- RLS
alter table public.profiles enable row level security;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admin debug (SQL Editor only):
-- select p.id, p.display_name, p.cash_balance_usd, u.email
-- from public.profiles p
-- join auth.users u on u.id = p.id;
