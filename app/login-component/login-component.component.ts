import { registerLocaleData } from '@angular/common';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { EventEmitter } from 'events';
import { user } from 'src/usersdetails.model';
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
  @Output()user2
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    console.log(this.failedLogin)

  }
 onSubmit(form:NgForm){
   console.log(form.value);
   }
  login() {
    this.authenticationService.login(new Credentials(this.email, this.password)).then(userDetails => {
      this.failedLogin = false;
      this.failedLoginMessage = "";
      this.authenticationService.searchUser(Credentials).subscribe(loggedinfo=>console.log(loggedinfo),error=>console.log(error))
       this.authenticationService.saveuser(this.email, this.password).subscribe(loggedinfo=>{
    return  this.user2=loggedinfo;
      console.log('user2=',this.user2);
    },error=>console.log(error))

      console.log(this.email,this.password)
      this.authenticationService.getUser();
    

      console.log(this.authenticationService.getUser())
       if(this.email==="lemassif_showroom@gmail.com"){
        this.router.navigate(['admin']);

       }
       else{
        this.router.navigate(['viewUser']);

       }
   
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
