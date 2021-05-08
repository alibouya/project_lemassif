import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';
import {RegisterDetails} from '../authentication/model/credentials';

@Component({
  selector: 'app-registration-component',
  templateUrl: './registration-component.component.html',
  styleUrls: ['./registration-component.component.scss']
})
export class RegistrationComponentComponent implements OnInit {
 
  constructor(private router: Router, private authService: AuthenticationService) { }
  // email: string;
  // name: string;
  // password: string;
  // role: string;
  // phone:number
  name='';

  email='';
  password='';
  phone=0;
 
  types = [{value: 'Client', viewValue:'Client'}, {value: 'Admin', viewValue: 'Admin'}];
  // , {value: 'invalid', viewValue: 'Invalid'}
  role= '';
  imgURL;
  error = {};

  //Type is hard coded as user - otherwise registration doesn't work

  ngOnInit() {
    console.log(this.name,this.email,this.phone,this.role,this.password)
  }
  OnSubmit(form:NgForm){
    console.log(form.value);
    }
  register() {
  

    this.authService.register(new RegisterDetails( this.name, this.email,this.password, this.role,this.phone))
    
     .catch(err => {
       this.error = err.error;
       console.log(this.error)
     });
     
     console.log(RegisterDetails)    //Type is hard coded as user - otherwise registration doesn't work
  }

  imageSelected(selectedURL){
    this.imgURL = selectedURL;
  }

}
