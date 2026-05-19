import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { AllocationSlice } from '../../../../core/constants/mock-portfolio.constants';

interface DonutSlice {
  name: string;
  percent: number;
  offset: number;
  color: string;
}

const COLORS = ['#111827', '#374151', '#6B7280', '#9CA3AF', '#3B82F6', '#1D4ED8'];

@Component({
  selector: 'app-asset-allocation',
  standalone: true,
  templateUrl: './asset-allocation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetAllocationComponent {
  readonly slices = input.required<AllocationSlice[]>();

  protected readonly donutSlices = computed<DonutSlice[]>(() => {
    const total = this.slices().reduce((s, r) => s + r.value, 0);
    let offset = 0;
    return this.slices().map((slice, i) => {
      const percent = (slice.value / total) * 100;
      const result: DonutSlice = { name: slice.name, percent, offset, color: COLORS[i % COLORS.length] };
      offset += percent;
      return result;
    });
  });

  protected sliceDash(pct: number): string {
    const circ = 2 * Math.PI * 40;
    return `${(pct / 100) * circ} ${circ}`;
  }

  protected sliceOffset(offset: number): string {
    const circ = 2 * Math.PI * 40;
    return `${(-offset / 100) * circ}`;
  }
}
