import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { User } from "../classes/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  user: User;
  pass: string;
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.SignOut();
    localStorage.removeItem("user");
    this.user = new User();
    this.user.photoURL =
      "https://firebasestorage.googleapis.com/v0/b/paygate-2883d.appspot.com/o/90x90.jpg?alt=media&token=99d0cf7f-3b95-46c6-a501-673e69a92a9b";
  }

  login() {
    this.authService.SignIn(this.email, this.password);
    this.email = this.password = "";
  }
  signup() {
    this.authService.SignUp(
      this.user.email,
      this.user.password,
      this.user.displayName,
      this.user.photoURL,
      this.user.adresse,
      this.user.phoneNumber
    );
    
    this.user = new User();
  }
}
