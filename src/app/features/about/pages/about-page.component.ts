import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import {
  ABOUT_HIGHLIGHT_STATS,
  ABOUT_PAGE_COPY,
  ABOUT_TEAM_MEMBERS,
  ABOUT_TECH_STACK,
  RS_SCHOOL_URL,
} from '../about-team.constants';
import { TeamMemberCardComponent } from '../components/team-member-card/team-member-card.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [TeamMemberCardComponent],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {
  protected readonly copy = ABOUT_PAGE_COPY;
  protected readonly highlightStats = ABOUT_HIGHLIGHT_STATS;
  protected readonly techStack = ABOUT_TECH_STACK;
  protected readonly rsSchoolUrl = RS_SCHOOL_URL;
  protected readonly members = signal(ABOUT_TEAM_MEMBERS);
}
