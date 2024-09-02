import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CharacterCardComponent } from './components';
import { RouterLink } from '@angular/router';
import { GlobalStore } from '@app/store/global.store';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [CharacterCardComponent,RouterLink],
  templateUrl: './main-container.component.html',
  styleUrl: './main-container.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent {
readonly store = inject(GlobalStore);
}
