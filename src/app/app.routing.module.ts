import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegistrerComponent } from "./auth/registrer/registrer.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrerComponent },
  {
    path: '',
    canLoad: [AuthGuard],
    loadChildren: () => import('./components/modules/modules.module')
      .then(module => module.ModulesModule)
  },
  { path: '**', redirectTo: '' },
]

@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]

})

export class AppRoutingModule { }
