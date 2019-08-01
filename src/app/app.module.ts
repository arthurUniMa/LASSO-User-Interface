import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {LslEditorComponent} from './lslEditor/lsl-editor.component';
import {MyLslComponent} from './myLsl/my-lsl.component';
import {RepositoryComponent, ExampleWorkspaceDialogContent, WorkspaceDialogContent} from './repository/repository.component';

import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {JwtInterceptor} from './utilities/jwt.interceptor';
import {MatTableModule} from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTreeModule} from '@angular/material/tree';
import {fetLoginProvider} from './utilities/jwt-login-fake';





@NgModule({
  exports: [
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    LslEditorComponent,
    MyLslComponent,
    RepositoryComponent,
    ExampleWorkspaceDialogContent,
    WorkspaceDialogContent,
  ],
  entryComponents: [ 
    ExampleWorkspaceDialogContent, 
    WorkspaceDialogContent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatTreeModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent },
      {path: 'lsleditor', component: LslEditorComponent, /**  canActivate: [AuthorizationGuard] */},
      {path: 'myLsl', component: MyLslComponent, /** canActivate: [AuthorizationGuard]  */},
      {path: 'repository', component: RepositoryComponent, /** canActivate: [AuthorizationGuard]  */},
      {path: '', redirectTo: 'login', pathMatch: 'full'}
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    
    fetLoginProvider
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);