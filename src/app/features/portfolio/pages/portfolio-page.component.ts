import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
// TODO(OgOqro) ნაბიჯი 3: when PortfolioService is ready, add inject to the import above
import { DecimalPipe } from '@angular/common';

// TODO(OgOqro) ნაბიჯი 3: PortfolioService-ის import
// import { PortfolioService } from '../../../core/services/portfolio.service';

// TODO(OgOqro) ნაბიჯი 1: StatCardComponent-ის import — ეს უკვე გვაქვს shared-ში
// import { StatCardComponent } from '../../../shared/ui/stat-card/stat-card.component';

/**
 * TODO(OgOqro) — შენი დავალებები (ზემოდან ქვემოდან წაიკითხე):
 *
 * ნაბიჯი 1 — შექმენი PortfolioHolding model:
 *   ფაილი: src/app/core/models/portfolio.model.ts  ← stub უკვე გაკეთებულია
 *   გახსენი და შეავსე interface-ის ველები.
 *
 * ნაბიჯი 2 — შექმენი MOCK_HOLDINGS constant:
 *   ფაილი: src/app/core/constants/mock-holdings.constants.ts
 *   (stub უკვე გაკეთებულია — შეავსე მონაცემებით)
 *
 * ნაბიჯი 3 — შეავსე PortfolioService:
 *   ფაილი: src/app/core/services/portfolio.service.ts  ← stub გაკეთებულია
 *   შეავსე signal, computed fields.
 *
 * ნაბიჯი 4 — ამ ფაილში inject(PortfolioService) და ჩაანაცვლე placeholder-ები.
 *
 * ნაბიჯი 5 — template-ში (portfolio-page.component.html) შეავსე TODO-ები.
 *
 * ᲙᲝᲜᲕᲔᲜᲪᲘᲔᲑᲘ (lint ვერ ჩაივლის თუ დაარღვევ):
 *   - standalone: true           ← უკვე დაყენებულია
 *   - OnPush                     ← უკვე დაყენებულია
 *   - inject() — სერვისების inject-ისთვის, არა constructor
 *   - protected — template-ში გამოყენებული members-ისთვის
 *   - private — ყველა დანარჩენისთვის
 *   - console.log — არ გამოიყენო, LoggerService გამოიყენე
 */

// TODO(OgOqro): replace with real PortfolioHolding from core/models/portfolio.model.ts
interface PortfolioHolding {
  symbol: string;
  name: string;
  amount: number;
  price: number;
  value: number;
  changePct24h: number;
}

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioPageComponent {
  // TODO(OgOqro) ნაბიჯი 3: uncomment after creating PortfolioService
  // private readonly portfolioService = inject(PortfolioService);

  // TODO(OgOqro) ნაბიჯი 4: replace these placeholders with real computed() from PortfolioService

  /** Total portfolio value — e.g. '$147.34K' */
  protected readonly totalValue = computed(() => '$0.00');

  /** 7-day percentage change */
  protected readonly change7d = computed(() => '+0.00%');

  /** Total number of different assets */
  protected readonly totalAssets = computed(() => 0);

  /** Symbol of the best performing asset today */
  protected readonly bestAsset = computed(() => '—');

  /** Holdings list */
  protected readonly holdings = computed<PortfolioHolding[]>(() => []);
}
