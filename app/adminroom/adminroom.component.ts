import { Component, Input, LOCALE_ID, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { messages } from './messagesformat';
import { MessagesservivesService } from 'src/messagesservives.service';
import { UsersserviceService } from 'src/usersservice.service';
import { user } from 'src/usersdetails.model';
import { NgForm } from '@angular/forms';
import { pubs } from '../authentication/model/pubs.model';
import { Subscription } from 'rxjs';
import { UserDetails } from '../authentication/model/credentials';
import {DomSanitizer, SafeHtml, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-adminroom',
  templateUrl: './adminroom.component.html',
  styleUrls: ['./adminroom.component.scss']
})

export class AdminroomComponent implements OnInit {

  


  /*********************************** */
  public messages;
  loadedPosts: messages[] = [];
  loadedUsers: user[] = [];
  isFetchingUsers = false;
  useradmin:user
  isFetching = false;
  isPosting1 = false;
  showing = false;
  private userSub: Subscription;

  cropperUpdateNeeded = false;
  user:UserDetails;

  constructor(private authService: AuthenticationService,private users:UsersserviceService,private _sanitizer: DomSanitizer,
     private messagesservivesService: MessagesservivesService, private http: HttpClient) { }
     
  private description: string;
  private title: string;
  private image: string;

  private marque: string;
  types = [{value: 'Salons', viewValue:'Salons'}, {value: 'Tables', viewValue: 'Tables'},
   {value: 'Meubles TV', viewValue: 'Meubles TV'}, {value: 'Chambres à Coucher', viewValue: 'Chambres à Coucher'},
    {value: 'Cuisines', viewValue: 'Cuisines'}, {value: 'Divers', viewValue: 'Divers'}];
    
    
   imgURL1: any;
   imgURL2: any='';
   imagename='';
    id=''
  
   loadedPubs1: pubs[] = [];
  ngOnInit() {
    console.log(this.user = this.authService.getUserSubject().getValue());

    console.log(this.loadedUsers);
      this.userSub=this.authService.userSubject.subscribe(user => {
        console.log(user);
        console.log(!!user);
        console.log(this.userSub); 
  console.log(this.authService.getUser())  
  })

}
  currentuser(){
    this.authService.saveuser("lemassif_showroom@gmail.com","ourmassifroom0000").subscribe(loggedinfo=>{
      return  this.useradmin=loggedinfo;
        console.log('user2=',this.useradmin);
      },error=>console.log(error))
  }
  onFetchPosts() {
    // Send Http request
    this.isFetching = !this.isFetching;
    

    this.messagesservivesService.fetchPosts().subscribe(posts => {
      // ...

      this.isFetching = false;
      this.isFetchingUsers = true;
      this.isPosting1 = true;
      this.showing = false;



      this.loadedPosts = posts;
      console.log()
    });;
  }
  onFetchUsers(){
    this.isFetchingUsers = true;

   this.users.fetchUsers().subscribe(postsuser => {
    // ...
   

    this.isFetchingUsers = false;
    this.isFetching = true;
    this.isPosting1 = true;
  this.showing = false;

    this.loadedUsers = postsuser;
    console.log(this.loadedUsers)
  });
  }
  
  recentpublication(){
    this.isPosting1=!this.isPosting1


    console.log(this.loadedPubs1)

    this.authService.getlastpublication().subscribe(posts => {
      // ...

      this.isPosting1 = false;
      this.isFetchingUsers = true;
      this.isFetching = true;
    this.showing = false;



      this.loadedPubs1 = posts;
      console.log(this.loadedPubs1)
      console.log(this.loadedPubs1[0])

    });;
  }

  createnewpublication(pubform:NgForm){
    this.showing=true;
  console.log(pubform.value);
  this.users.savepubli(pubform.value.title,
    pubform.value.description,
    pubform.value.image,
    pubform.value.marque).subscribe(loggedinfo=>console.log(loggedinfo),error=>console.log(error))
    this.showing = false;


  }








  /******************************************** */
 
  Logout(){
    this.authService.logout()
  }

 
  savepub(){
    this.showing = true;
    
    this.isFetchingUsers = true;
    this.isFetching = true;
    this.isPosting1 = true;
    console.log( this.showing )
  }

  // onImageChange(event: any){
  //   console.log(event.target.files[0].name)

  //   // let files = event.target.files;
  //   // let reader = new FileReader();
  //   // reader.readAsDataURL(files[0]);
  //   // reader.onload = (_event) => {
  //   //   this.imgURL1 = reader.result;
  //     this.imgURL1 =event.target.files[0].name
  //     //Update happens in here because onload is an async function
     
  // }
  readUrl(event:any) {
    console.log(event)
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.imgURL1 = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  
  deletepub(body){
    console.log(body._id)
    // this.id=_id.toString();
    console.log('http://localhost:5000/publications/'+body._id)
  this.http.delete('http://localhost:5000/publications/'+body._id).subscribe( data => {
    console.log('Delete successful');
},
 error => {
   
    console.error('There was an error!', error);
}
)

  }

  deleteuser(body){
    console.log(body._id)
    // this.id=_id.toString();
    console.log('http://localhost:5000/users/'+body._id)
  this.http.delete('http://localhost:5000/users/'+body._id).subscribe( data => {
    console.log('Delete successful');
},
 error => {
   
    console.error('There was an error!', error);
}
)
  }

/********************************************* */
deletemessage(body){
  console.log(body._id)
    // this.id=_id.toString();
    console.log('http://localhost:5000/messages/'+body._id)
  this.http.delete('http://localhost:5000/messages/'+body._id).subscribe( data => {
    console.log('Message deleted successfully');
},
 error => {
   
    console.error('There was an error, message cannot be deleted', error);
}
)
}

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
    }



