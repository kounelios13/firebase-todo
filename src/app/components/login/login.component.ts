import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(
    private aFAuth: AngularFireAuth,
    private snackService: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {}

  async googleLogin() {
    try {
      await this.aFAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
      this.router.navigate(["profile"]);
    } catch (e) {
      this.snackService.open(e.message, null, { duration: 4000 });
    }
  }

  async fbLogin() {
    try {
      await this.aFAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
      this.router.navigate(["profile"]);
    } catch (e) {
      this.snackService.open(e.message, null, { duration: 4000 });
    }
  }
}
