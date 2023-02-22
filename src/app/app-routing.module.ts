import { UpdateDocumentComponent } from './pages/documents/update-document/update-document.component';
import { ShowComponent } from './pages/documents/show/show.component';
import { ForbiddenComponent } from './pages/error/forbidden/forbidden.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { CreateDocumentComponent } from './pages/documents/create-document/create-document.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IndexDocumentComponent } from './pages/documents/index-document/index-document.component';
import { IndexUserComponent } from './pages/manage/user/index-user/index-user.component';
import { EditUserComponent } from './pages/manage/user/edit-user/edit-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'isp', component: IndexDocumentComponent },
  { path: 'wi', component: IndexDocumentComponent },
  { path: 'form', component: IndexDocumentComponent },
  { path: 'create', component: CreateDocumentComponent },
  { path: 'edit/:id', component: UpdateDocumentComponent },
  { path: 'show/:id', component: ShowComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'users', component: IndexUserComponent },
  {path:'editUser/:id', component: EditUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
