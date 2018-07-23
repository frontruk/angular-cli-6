// angular
import { Routes } from '@angular/router';

// libs
import { MetaGuard } from '@ngx-meta/core';

// framework
import { ChangeLanguageComponent } from '~/app/framework/i18n/i18n.module';

// components
import { LayoutPublicComponent } from './layout-public/layout-public.component';
import { LayoutAuthComponent } from './layout-auth/layout-auth.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutPublicComponent,
    children: [
      {
        path: '',
        loadChildren: './+home/home.module#HomeModule'
      },
    ],
    canActivateChild: [MetaGuard],
    data: {
      i18n: {
        isRoot: true
      }
    }
  },
  {
      path: 'edit',
      component: LayoutAuthComponent,
      children: [
          {
              path: '',
              loadChildren: './+home/home.module#HomeModule'
          },
      ],
      canActivateChild: [MetaGuard],
      data: {
          i18n: {
              isRoot: true
          }
      }
  },
  {
    path: 'change-language/:languageCode',
    component: ChangeLanguageComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
