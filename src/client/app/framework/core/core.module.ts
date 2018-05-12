// angular
import { forwardRef, Injector, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ConfigLoader, ConfigModule, ConfigService } from '@ngx-config/core';
import { ConfigHttpLoader } from '@ngx-config/http-loader';
import { CacheModule } from '@ngx-cache/core';
import { MetaLoader, MetaModule, MetaStaticLoader } from '@ngx-meta/core';
// TODO: ngx-i18n-router
// import { I18N_ROUTER_PROVIDERS, I18NRouterLoader } from '@ngx-language-router/core';
// import { I18NRouterConfigLoader } from '@ngx-language-router/config-loader';
import { TranslateService } from '@ngx-translate/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// module
import { ConsoleService } from './src/console.service';
import { LogService } from './src/log.service';
import { WindowService } from './src/window.service';
export { ConsoleService, LogService, WindowService };
export { BaseComponent } from './src/base.component';

import {
    LocationStrategy,
    PathLocationStrategy
} from '@angular/common';
import {
    RouterStateSerializer,
    StoreRouterConnectingModule
} from '@ngrx/router-store';
import {
    CustomRouterStateSerializer,
    effects,
    reducers
} from './store';

export const CORE_PROVIDERS: Array<any> = [
  ConsoleService,
  LogService,
  WindowService
];
// HTTP Auth
import { TokenService } from './services/token.service';
import { TokenInterceptor } from './services/token.interceptor';
export const CORE_SYS_PROVIDERS: Array<any> = [
    {
        provide: RouterStateSerializer,
        useClass: CustomRouterStateSerializer
    },
    {
        provide: LocationStrategy,
        useClass: PathLocationStrategy
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor, multi: true
    }
];

// Reducer update
const enviorment = {
    development: true,
    production: false,
};
// for AoT compilation
export function configFactory(injector: Injector): ConfigLoader {
  const http = forwardRef(() => injector.get(HttpClient)) as any;

  return new ConfigHttpLoader(http, './assets/config.local.json');
}

// TODO: ngx-i18n-router
// export function i18nRouterFactory(config: ConfigService, rawRoutes: Routes): I18NRouterLoader {
//   return new I18NRouterConfigLoader(config, rawRoutes, 'routes');
// }

export function metaFactory(config: ConfigService, translate: TranslateService): MetaLoader {
  return new MetaStaticLoader({
    callback: (cur: string) => translate.get(cur),
    pageTitlePositioning: config.getSettings('seo.pageTitlePositioning'),
    pageTitleSeparator: config.getSettings('seo.pageTitleSeparator'),
    applicationName: config.getSettings('system.applicationName'),
    applicationUrl: config.getSettings('system.applicationUrl'),
    defaults: {
      title: config.getSettings('seo.defaultPageTitle'),
      description: config.getSettings('seo.defaultMetaDescription'),
      generator: 'ng-seed',
      'og:site_name': config.getSettings('system.applicationName'),
      'og:type': 'website',
      'og:locale': config.getSettings('i18n.defaultLanguage.culture'),
      'og:locale:alternate': config.getSettings('i18n.availableLanguages')
        .map((cur: any) => cur.culture)
        .toString()
    }
  });
}

@NgModule({
  imports: [
      StoreModule.forRoot(reducers),
      StoreRouterConnectingModule,
      EffectsModule.forRoot(effects),
      enviorment.development ? StoreDevtoolsModule.instrument() : [],
      ConfigModule.forRoot(),
      CacheModule.forRoot(),
      MetaModule.forRoot()
  ],
  providers: [
      ...CORE_PROVIDERS,
      ...CORE_SYS_PROVIDERS,
      TokenService,
      TokenInterceptor
    // I18N_ROUTER_PROVIDERS
  ]
})
export class CoreModule {
  static forRoot(configuredProviders: Array<any>): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: configuredProviders
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule)
      throw new Error('CoreModule already loaded; import in root module only.');
  }
}
