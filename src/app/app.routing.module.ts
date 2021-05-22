import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegistrerComponent } from "./auth/registrer/registrer.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { dashboardRoutes } from "./dashboard/dashboard.routes";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrerComponent },
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    canActivate: [AuthGuard]
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
