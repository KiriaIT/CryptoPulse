import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NOT_FOUND_COPY } from '../../core/constants/not-found.constants';
import { ROUTE_PATHS } from '../../core/constants/route-paths.constants';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {
  protected readonly copy = NOT_FOUND_COPY;
  protected readonly dashboardLink = ['/', ROUTE_PATHS.DASHBOARD] as const;
}
