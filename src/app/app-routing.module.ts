import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { CreateDocumentComponent } from './pages/documents/create-document/create-document.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IndexDocumentComponent } from './pages/documents/index-document/index-document.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'isp', component: IndexDocumentComponent },
  { path: 'wi', component: IndexDocumentComponent },
  { path: 'form', component: IndexDocumentComponent },
  { path: 'create', component: CreateDocumentComponent },
  { path: 'edit/:id', component: CreateDocumentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
