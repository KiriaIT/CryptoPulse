import { CanDeactivateFn } from '@angular/router';

/**
 * TODO(Freemason-12) — YOUR TASK: implement this guard.
 *
 * WHAT THIS GUARD DOES:
 *   When the user tries to leave a page that has an unsaved form,
 *   this guard shows a confirmation prompt. If the user says "OK" → navigate away.
 *   If the user says "Cancel" → stay on the page.
 *
 * HOW TO IMPLEMENT:
 *
 * OPTION A — Simple (browser confirm dialog):
 *   Replace the `return true` below with:
 *   const hasUnsavedChanges = (component as { isDirty?: () => boolean }).isDirty?.() ?? false;
 *   return hasUnsavedChanges ? confirm('You have unsaved changes. Leave anyway?') : true;
 *
 * OPTION B — Signal-based (better):
 *   1. Create a FormStateService in core/services/form-state.service.ts
 *      with a signal:  readonly isDirty = signal(false)
 *   2. Inject it here: const formState = inject(FormStateService);
 *   3. Return: formState.isDirty() ? confirm('You have unsaved changes. Leave anyway?') : true
 *   4. In your form component: set formState.isDirty to true when form.dirty changes
 *
 * CONVENTIONS:
 *   - This function is already the correct signature (CanDeactivateFn) — do NOT change it to a class.
 *   - Use inject() if you need any service. inject() works fine inside functional guards.
 *   - The guard must return boolean or Observable<boolean> or Promise<boolean>.
 *
 * WHERE TO ATTACH THIS GUARD:
 *   In app.routes.ts, add `canDeactivate: [unsavedFormGuard]` to any route that has a form.
 *   KiriaIT will show you where — check app.routes.ts after his PR.
 *
 * SPRINT 2 REQUIREMENT: at least one canDeactivate guard authored by Freemason-12. ✓ This is it.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const unsavedFormGuard: CanDeactivateFn<unknown> = (_component, _route, _state) => {
  // TODO(Freemason-12): replace this with your implementation (see options above)
  return true;
};
