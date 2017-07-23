import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { CodemirrorModule } from 'ng2-codemirror';


// routing
import { RouterModule, Routes } from '@angular/router';

// authentication
import { AuthService } from './services/auth.service';
import { UserGuard } from './guards/user.guard';
import { AdminGuard } from './guards/admin.guard';
import { HttpClient } from './services/http-client.service';

// services
import { UserService } from './services/user.service';
import { PackageService } from './services/package.service';
import { CallService } from './services/call.service';

// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { PackageListComponent } from './components/package/package-list/package-list.component';
import { PackageDetailComponent } from './components/package/package-detail/package-detail.component';
import { CallListComponent } from './components/calls/call-list/call-list.component';
import { CallDetailComponent } from './components/calls/call-detail/call-detail.component';


const appRoutes: Routes = [
  {
    path: '',
    children: [
      { 
        path: 'admin', 
        children: [
          { path: '', redirectTo: 'users', pathMatch: 'full' },
          {
            path: 'users',
            canActivate: [AdminGuard],
            children: [
              { path: '', component: UserListComponent },
              { path: ':id', component: UserDetailComponent }
            ]
          },{
            path: 'packages',
            canActivate: [AdminGuard],
            children: [
              { path: '', component: PackageListComponent },
              { path: ':id', component: PackageDetailComponent }
            ]
          }
        ]
      },{
        path: 'user',
        children: [
          { path: '', redirectTo: 'calls', pathMatch: 'full' },
        ]
      }
    ]
  },{
    path: 'calls',
    canActivate: [UserGuard],
    children: [
      {path: '', component: CallListComponent },
      {path: ':id', component: CallDetailComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    PackageListComponent,
    PackageDetailComponent,
    LoginComponent,
    NotFoundComponent,
    CallListComponent,
    CallDetailComponent  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CdkTableModule,
    MaterialModule,
    HttpModule,
    FormsModule,
    CodemirrorModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false, useHash: true } // <-- debugging purposes only
    )
  ],
  providers: [
    AuthService,
    AdminGuard,
    UserGuard,
    UserService,
    CallService,
    PackageService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
