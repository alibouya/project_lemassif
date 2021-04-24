import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {Credentials} from '../authentication/model/credentials';
import {  TokenDetails} from '../authentication/model/credentials';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {

  private email: string;
  private password: string;
  private failedLogin: boolean = true;
  private failedLoginMessage: String = "";

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    console.log(this.failedLogin)

  }

  login() {
    this.authenticationService.login(new Credentials(this.email, this.password)).then(userDetails => {
      this.failedLogin = false;
      this.failedLoginMessage = "";

      console.log("credentials",this.email,this.password)
      this.router.navigate(['viewUser']);
      // console.log(" TokenDetails", TokenDetails)
// this.authenticationService.saveToken(token)  
  }).catch( err => {
      this.failedLogin = true;
      if(!this.email && !this.password){
        this.failedLoginMessage = "You must enter a email and password";
      } else if(!this.email){
        this.failedLoginMessage = "You must enter a email";
      } else if(!this.password){
        this.failedLoginMessage = "You must enter a password";
      } else {
        this.failedLoginMessage = "Invalid email or password";
      }
    });
  }

  signout(){
    window.sessionStorage.clear();
  }

}
