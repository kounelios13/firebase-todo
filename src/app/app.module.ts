import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire";
import {
  AngularFirestoreModule,
  FirestoreSettingsToken
} from "@angular/fire/firestore";
import { MatFormFieldModule, MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../environments/environment";
import { LoginComponent } from "./components/login/login.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { AngularFireAuthGuard } from "@angular/fire/auth-guard";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { TodoComponent } from "./components/todo/todo.component";
import { FormsModule } from "@angular/forms";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatCardModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule
  ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
