import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Credentials, UserDetails } from '../authentication/model/credentials';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { pubs } from '../authentication/model/pubs.model';
import { user } from 'src/usersdetails.model';
import { MessagesservivesService } from 'src/messagesservives.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})


export class UserViewComponent implements OnInit {
  private readonly SESSION_STORAGE_TOKEN_KEY = 'accessToken';

  userViewing: UserDetails;
  private cur_user:UserDetails;
  user1: UserDetails[]= [];
  @Input()user2
   user3:user[]
  isOwnPage: boolean;
  isComment= false;
  isPosting = false;
  loadedPubs: pubs[] = [];
  devis=false
  comment=false
  lastcomment=true

  textarea='';
  pubstab:String[]=[];
  // LOCAL_STORAGE_TOKEN_VALUE: string;
  constructor(private mess : MessagesservivesService, private authService: AuthenticationService, private route: ActivatedRoute,private http:HttpClient) { }

  ngOnInit() {
     this.authService.getUserSubject().subscribe(user1 => {
      user1;
    console.log(user1);
  this.cur_user=user1
  console.log('the current user is',this.cur_user);
  })
    let email:string = this.route.snapshot.queryParams['email'];
    this.authService.getOtherUser(email).then( otherUser => {
      this.userViewing = otherUser;
      

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
    
    this.authService.saveuser(this.cur_user.email, this.cur_user.password).subscribe(loggedinfo=>{
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
writecomment(pubs){
   this.comment=!this.comment
  // this.lastcomment=!!this.lastcomment
}



sendcomment(textarea:string,loadedPubs:string){
  console.log(loadedPubs)
  console.log(textarea)

  // this.authService.write_comment(textarea,loadedPubs)
  // .subscribe(usercomment=>console.log(
  //   usercomment),error=>console.log("there is an error please check again"))
  
    const headers1=new HttpHeaders().set('x-auth-token',sessionStorage.getItem(this.SESSION_STORAGE_TOKEN_KEY))
    console.log(sessionStorage.getItem(this.SESSION_STORAGE_TOKEN_KEY))
   this.http.post("http://localhost:5000/publications/comment/"+loadedPubs,{text:textarea},{headers:headers1})
  .subscribe(usercomment=>console.log(
     usercomment),error=>console.log("error"))
  }

/**********************Delete Comment**************************** */
deletecomment(loadedPubs:string,loadedPubs_id:string){
  console.log(loadedPubs)
  console.log(loadedPubs_id)

  // this.authService.write_comment(textarea,loadedPubs)
  // .subscribe(usercomment=>console.log(
  //   usercomment),error=>console.log("there is an error please check again"))
  
    const headers1=new HttpHeaders().set('x-auth-token',sessionStorage.getItem(this.SESSION_STORAGE_TOKEN_KEY))
    console.log(sessionStorage.getItem(this.SESSION_STORAGE_TOKEN_KEY))
   this.http.delete("http://localhost:5000/publications/comment/"+loadedPubs+"/"+loadedPubs_id,{headers:headers1})
  .subscribe(usercomment=>console.log(
     usercomment),error=>console.log("error"))
  }
  likes(loadedPubs){
    console.log(loadedPubs)
  
    // this.authService.write_comment(textarea,loadedPubs)
    // .subscribe(usercomment=>console.log(
    //   usercomment),error=>console.log("there is an error please check again"))
    
      const headers1=new HttpHeaders().set('x-auth-token',sessionStorage.getItem(this.SESSION_STORAGE_TOKEN_KEY))
      console.log(sessionStorage.getItem(this.SESSION_STORAGE_TOKEN_KEY))
    this.http.put<any>("http://localhost:5000/publications/like/"+loadedPubs,sessionStorage.getItem(this.SESSION_STORAGE_TOKEN_KEY),{headers:headers1})
    .subscribe(userlikes=>console.log(
      userlikes))
    }
    unlikes(loadedPubs_id:string){
      
      console.log(loadedPubs_id)
    
      // this.authService.write_comment(textarea,loadedPubs)
      // .subscribe(usercomment=>console.log(
      //   usercomment),error=>console.log("there is an error please check again"))
      
        const headers1=new HttpHeaders().set('x-auth-token',sessionStorage.getItem(this.SESSION_STORAGE_TOKEN_KEY))
        console.log(sessionStorage.getItem(this.SESSION_STORAGE_TOKEN_KEY))
        const token=sessionStorage.getItem(this.SESSION_STORAGE_TOKEN_KEY)
       this.http.put<any>("http://localhost:5000/publications/unlike/"+loadedPubs_id,sessionStorage.getItem(this.SESSION_STORAGE_TOKEN_KEY),{headers:headers1})
      .subscribe(usercomment=>console.log(
         usercomment))
      }
  }


