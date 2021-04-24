import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponentComponent } from './home-component/home-component.component';
import { RegistrationComponentComponent } from './registration-component/registration-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { WelcomeComponentComponent } from './welcome-component/welcome-component.component';
import { PostsComponentComponent } from './posts-component/posts-component.component';
import { UserViewComponent } from './user-view/user-view.component';


import { AuthGuardService } from './auth-guard/auth-guard.service';
import { FooterComponent } from './footer/footer.component';
import { TablesbassesComponent } from './tablesbasses/tablesbasses.component';
import { ChambresComponent } from './chambres/chambres.component';
import { SallesmangerComponent } from './sallesmanger/sallesmanger.component';
import { SalonsComponent } from './salons/salons.component';
import { HeaderComponent } from './header/header.component';
import { AccueilComponent } from './accueil/accueil.component';
import { DiversComponent } from './divers/divers.component';
import { Notfound404Component } from './notfound404/notfound404.component';

const routes: Routes = [
  
  {
    path: 'home',
    
      component: HomeComponentComponent
   
  },
  {
    path: 'header',component: HeaderComponent
    
  },{
    path: 'accueil', component: AccueilComponent
  },
    
    {
      path: 'salons',
  
      component: SalonsComponent
    },
  
    {
      path: 'sallesamanger',
      component: SallesmangerComponent
    },
    {
      path: 'chambres',
      component: ChambresComponent
    },
    {
      path: 'divers',
      component: DiversComponent
    },
    {
      path: 'tablesbasses',
      component: TablesbassesComponent
    },
  
  {
    path: 'footer',
    component: FooterComponent
  },
  // { path: '', component: WelcomeComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'register', component: RegistrationComponentComponent },
  { path: 'home', component:HomeComponentComponent },
  // , canActivate: [AuthGuardService]
  { path: 'posts', component:PostsComponentComponent },
  { path: 'viewUser', component:UserViewComponent },

  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  
  }, {
    path: '**', component: Notfound404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
