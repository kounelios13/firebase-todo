import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, share } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth, User } from "firebase/app";
import { Router } from "@angular/router";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent {
  user: User;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AngularFireAuth,
    private router: Router
  ) {
    this.authService.user.subscribe(user => (this.user = user));
  }
  logout() {
    this.authService.auth
      .signOut()
      .then(() => this.router.navigate(["/login"]));
  }
}
