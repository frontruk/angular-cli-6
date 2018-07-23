// angular
import { Component } from '@angular/core';

// framework
import { BaseComponent } from '~/app/framework/core/core.module';

@Component({
  selector: 'app-layout-auth',
  templateUrl: './layout-auth.component.html',
  styleUrls: ['layout-auth.component.scss']
})

export class LayoutAuthComponent extends BaseComponent {
  onActivate(event$: any, scrollContainer: any): void {
    scrollContainer.scrollTop = 0;
  }
}
