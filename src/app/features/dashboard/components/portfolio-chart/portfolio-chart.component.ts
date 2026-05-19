import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { PortfolioChartPoint } from '../../../../core/constants/mock-portfolio.constants';

@Component({
  selector: 'app-portfolio-chart',
  standalone: true,
  imports: [],
  templateUrl: './portfolio-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioChartComponent {
  readonly points = input.required<PortfolioChartPoint[]>();
  readonly title = input<string>('Portfolio Performance');

  protected readonly maxValue = computed(() =>
    Math.max(...this.points().map((p) => p.value), 1),
  );

  protected readonly chartHeight = 160;

  protected pointToCoord(point: PortfolioChartPoint, index: number): string {
    const pts = this.points();
    if (pts.length < 2) return '0,0';
    const x = (index / (pts.length - 1)) * 100;
    const y = this.chartHeight - (point.value / this.maxValue()) * this.chartHeight;
    return `${x},${y}`;
  }

  protected get polylinePoints(): string {
    return this.points()
      .map((p, i) => this.pointToCoord(p, i))
      .join(' ');
  }

  protected get fillPath(): string {
    const pts = this.points();
    if (!pts.length) return '';
    const coords = pts.map((p, i) => this.pointToCoord(p, i)).join(' L ');
    const lastX = 100;
    return `M 0,${this.chartHeight} L ${coords} L ${lastX},${this.chartHeight} Z`;
  }
}
