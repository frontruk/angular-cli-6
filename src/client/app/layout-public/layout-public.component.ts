// angular
import { Component } from '@angular/core';

// framework
import { BaseComponent } from '~/app/framework/core/core.module';

@Component({
  selector: 'app-layout-public',
  templateUrl: './layout-public.component.html',
  styleUrls: ['layout-public.component.scss']
})
export class LayoutPublicComponent extends BaseComponent {
  onActivate(event$: any, scrollContainer: any): void {
    scrollContainer.scrollTop = 0;
  }
}
