import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * TODO(OgOqro) — ამ ფაილში გასაკეთებელი:
 *
 * ეს კომპონენტი უკვე სწორადაა დაყენებული (standalone, OnPush).
 * template-ში (about-page.component.html) გჭირდება RS School-ის ლოგოს დამატება.
 * დეტალები: development-notes/OgOqro/SPRINT-2-TASKS.md
 */
@Component({
  selector: 'app-about-page',
  standalone: true,
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {}
