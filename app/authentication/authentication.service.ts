import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Subscription, BehaviorSubject} from 'rxjs';
import {Credentials, RegisterDetails, TokenDetails, UserDetails} from './model/credentials';
import { map as __map, filter as __filter } from 'rxjs/operators';
import { Post } from '../posts/models/post';
import { pubs } from './model/pubs.model';
import { map } from 'rxjs/operators';
import { user } from 'src/usersdetails.model';
 registerUser1: RegisterDetails
 registerUser: RegisterDetails
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly LOCAL_STORAGE_TOKEN_KEY = 'accessToken';
  private  ROOT_URL = 'http://localhost:5000/authentification';
  private  ROOT1 = 'http://localhost:5000/authentification/current';

  private  ROOT= 'http://localhost:5000/users';

  private  ROOT_URL1 = 'http://localhost:5000/authentification/register';
  private API_LINK ='http://localhost:5000/publications/recent';
  private API_LINK1 ='http://localhost:5000/users';
  private API_LINK2="http://localhost:5000/messages";

  isPosting = false;
  loadedPubs: pubs[] = [];


  public userSubject: BehaviorSubject<UserDetails> = new BehaviorSubject<UserDetails>(null);
  private tokenDetails: TokenDetails;

  constructor(private router: Router, private http: HttpClient) { }
   public saveToken(token:string): void{
     window.sessionStorage.removeItem(this.LOCAL_STORAGE_TOKEN_KEY);
     window.sessionStorage.setItem(this.LOCAL_STORAGE_TOKEN_KEY,token)

   }
  //  saveToken(tokenDetails: TokenDetails) {
  //   localStorage.setItem(this.LOCAL_STORAGE_TOKEN_KEY, tokenDetails.token);
  //   this.tokenDetails = tokenDetails;
  // }

  private removeToken() {
    localStorage.removeItem(this.LOCAL_STORAGE_TOKEN_KEY);
    this.tokenDetails = undefined;
    
  }

  getToken(): TokenDetails | string {
    if (!this.tokenDetails) {
      return localStorage.getItem(this.LOCAL_STORAGE_TOKEN_KEY);
      console.log(localStorage.getItem(this.LOCAL_STORAGE_TOKEN_KEY))
    }
    return this.tokenDetails;
    console.log(this.tokenDetails)
  }

  getBasicAuth(): string {
    const token = this.getToken();
    if(token){
      return typeof token === 'string' ? btoa(token + ':') : btoa(token.token + ':');
    } else {
      return null;
    }
  }

   register(registerUser: RegisterDetails): Promise<any> {
   // console.log(registerUser)
   return  this.http.post<UserDetails>(this.ROOT_URL1, registerUser).toPromise().then(response => {
       console.log(registerUser)
      this.router.navigate(['login']);
    });
  }
 
  
  login(credentials: Credentials){
    // Creates its own header to supply basic auth with username/password instead of token
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post<TokenDetails>(this.ROOT_URL + '/login',credentials).toPromise().then(tokenDetails => {
      this.saveToken(tokenDetails.token);
      console.log("tokenDetails",tokenDetails.token)      
     


     // this.router.navigate(['chambres']);

      return  this.loggedInUser(tokenDetails);
    });
  }
  saveuser(email:String,password:String) {
    // Creates its own header to supply basic auth with username/password instead of token
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post<user>(this.ROOT_URL + '/login',{email:email,password:password})
  }


  removedExpiredSession(): void {
    this.removeToken();
    this.userSubject.next(null);
  }

  logout(): void {
    this.removeToken();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  loggedInUser(tokenDetails): Promise<user> {
    return this.http.get<user>(this.ROOT1,).toPromise().then(userDetails => {
      this.userSubject.next(userDetails);
      console.log(this.userSubject)

      return userDetails;
    }).catch(err => {
      this.removeToken();
      this.userSubject.next(null);
      return null;
    });
  }
  // loggedInUser(tokenDetails): Promise<UserDetails> {
  //   return this.http.get<UserDetails>(this.ROOT_URL+"/current" ).toPromise().then(userDetails => {
  //     this.userSubject.next(userDetails);
  //     console.log(this.userSubject)

  //     return userDetails;
  //   }).catch(err => {
  //     this.removeToken();
  //     this.userSubject.next(null);
  //     return null;
  //   });
  // }

  getUserSubject(): BehaviorSubject<UserDetails> {
    console.log(this.userSubject)

    return this.userSubject;
  }

  getUser() {
    const token = this.getToken();
    const user = this.userSubject.getValue();
    console.log(user)

    if (user) {
      return user;

    } else if (token) {
      return this.loggedInUser(token);
    } else {
      return null;
    }

  }

  searchUser(Credentials){
    

    return this.http
        .post<user>("http://localhost:5000/authentification/login",Credentials)
        
  
          }
        
      
   
  getOtherUser(username:string): Promise<UserDetails> {
    return this.http.get<UserDetails>(this.API_LINK1 + username).toPromise();
  }
  getlastpublication():Observable<Array<pubs>>{


   return this.http.get<any>(this.API_LINK)
    .pipe(
      __map(responseData => {
        console.log(responseData)
        // const postsArray : pubs[] = [];
        // for (const key in responseData) {
        //   postsArray.push(key)
        // }
        //return postsArray;
      return  responseData as Array<pubs>

      })
    )
  }
  // getlistusers(){
  //   this.http.get(this.API_LINK1).subscribe((datas)=> console.log(datas)),(errors)=>console.log(errors)

  // }
  getlistmessages(){
     this.http.get(this.API_LINK2).subscribe((datas)=>{console.log(datas); return datas//const json = JSON.stringify(datas);
     } ,(errors)=>{console.log(errors);return errors})
    //  return this.datas
    //return this.datas.
  }
}
