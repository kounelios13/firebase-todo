import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { ProfileComponent } from "./components/profile/profile.component";
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  canActivate
} from "@angular/fire/auth-guard";
import { TodoComponent } from "./components/todo/todo.component";

const unauthorizedRed = redirectUnauthorizedTo(["/login"]);

const routes: Routes = [
  { path: "", redirectTo: "profile", pathMatch: "full" },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "profile",
    component: ProfileComponent,
    ...canActivate(unauthorizedRed)
  },
  {
    path: "todos",
    component: TodoComponent,
    ...canActivate(unauthorizedRed)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
