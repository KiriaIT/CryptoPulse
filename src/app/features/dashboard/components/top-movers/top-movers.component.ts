import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { TopMover } from '../../../../core/constants/mock-portfolio.constants';

@Component({
  selector: 'app-top-movers',
  standalone: true,
  templateUrl: './top-movers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopMoversComponent {
  readonly movers = input.required<TopMover[]>();
}
