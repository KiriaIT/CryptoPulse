import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ABOUT_PAGE_COPY, AboutTeamMember } from '../../about-team.constants';

@Component({
  selector: 'app-team-member-card',
  standalone: true,
  templateUrl: './team-member-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMemberCardComponent {
  protected readonly copy = ABOUT_PAGE_COPY;
  readonly member = input.required<AboutTeamMember>();
}
