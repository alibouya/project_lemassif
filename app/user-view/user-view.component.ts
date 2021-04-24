import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from '../authentication/model/credentials';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  userViewing: UserDetails;
  user: UserDetails;
  isOwnPage: boolean;

  constructor(private authService: AuthenticationService, private route: ActivatedRoute) { }

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

}
