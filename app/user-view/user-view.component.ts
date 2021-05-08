import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Credentials, UserDetails } from '../authentication/model/credentials';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import { pubs } from '../authentication/model/pubs.model';
import { user } from 'src/usersdetails.model';
import { MessagesservivesService } from 'src/messagesservives.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})


export class UserViewComponent implements OnInit {
  
  userViewing: UserDetails;
  user: UserDetails;
  user1: UserDetails[]= [];
  @Input()user2
   user3:user[]
  isOwnPage: boolean;
  isComment= false;
  isPosting = false;
  loadedPubs: pubs[] = [];
  devis=false
  constructor(private mess : MessagesservivesService, private authService: AuthenticationService, private route: ActivatedRoute,private http:HttpClient) { }

  ngOnInit() {
    this.user = this.authService.getUserSubject().getValue();
    let email:string = this.route.snapshot.queryParams['email'];
    this.authService.getOtherUser(email).then( otherUser => {
      this.userViewing = otherUser;
      this.isOwnPage = this.user.email == this.userViewing.email;
      console.log(this.isOwnPage)

    })
  }
  Logout(){
    this.authService.logout()
  }
  recentpublication(){
    this.isPosting = true;

    this.authService.getlastpublication().subscribe(posts => {
      // ...

      this.isPosting = false;
      this.devis = false;

      this.loadedPubs = posts;
      console.log(this.loadedPubs)
    });;

  }
  // recentusers(){
  //   this.authService.getlistusers();

  // }
 
  currentuser(){
    this.authService.saveuser("ali.ali@gmail.com", "alialiali").subscribe(loggedinfo=>{
      this.user2=loggedinfo;
      console.log('user2=',this.user2);
    },error=>console.log(error))
//     this.user3=this.user2;
// console.log( this.user2)    
}
currentcomment(){
  this.isComment=!this.isComment
}
/****Ecrire un message pour demander un devis */
writemessage(deviform){
  console.log(deviform.value);
  this.mess.sendmessage(
    deviform.value.name,
    deviform.value.phone,
    deviform.value.text).subscribe(loggedinfo=>console.log(loggedinfo),error=>console.log(error))
    
}
savemess(){
this.devis=true;
this.isPosting=true
}




  }


