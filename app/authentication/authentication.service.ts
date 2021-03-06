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
  private user3: UserDetails 


  public userSubject: BehaviorSubject<UserDetails> = new BehaviorSubject<UserDetails>(null);
  private tokenDetails: TokenDetails;
  SESSION_STORAGE_TOKEN_KEY: string;

  constructor(private router: Router, private http: HttpClient) { }
   public saveToken(token:string): void{
     window.sessionStorage.removeItem(this.LOCAL_STORAGE_TOKEN_KEY);
     window.sessionStorage.setItem(this.LOCAL_STORAGE_TOKEN_KEY,token)
    console.log(token)
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
    console.log(this.tokenDetails)
    return this.tokenDetails;
    
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
    const headers=new HttpHeaders().set("x-auth-token","tokenDetails" )

    return this.http.post<TokenDetails>(this.ROOT_URL + '/login',{email:credentials.email,password:credentials.password}).toPromise().then(tokenDetails => {
      this.saveToken(tokenDetails.token);
      console.log("tokenDetails",tokenDetails.token)  
      this.loggedInUser(tokenDetails.token);
     


     // this.router.navigate(['chambres']);
console.log(this.loggedInUser(tokenDetails.token))
      return  this.loggedInUser(tokenDetails.token);
    });
  }
  saveuser(email, password) {
    // Creates its own header to supply basic auth with username/password instead of token
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
    });
    return this.http.post<TokenDetails>(this.ROOT_URL + '/login',{email:email,password:password})
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
    const headers=new HttpHeaders().set('x-auth-token',tokenDetails)
    return this.http.get<user>(this.ROOT1, {headers}).toPromise().then(userDetails => {
      this.userSubject.next(userDetails);
      console.log('l\'utilisateur est:',userDetails)
      this.user3=userDetails
      return userDetails;
    }).catch(err => {
      this.removeToken();
      this.userSubject.next(null);
      return null;
    });
  }
 

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

  searchUser(userDetails){
    
    const headers=new HttpHeaders({'x-auth-token':userDetails })
    return this.http
        .get<user>("http://localhost:5000/authentification/current",{headers:headers}) 
  
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
  write_comment(textarea,pub){
    console.log(pub)
    console.log(this.getToken()[1])
    const headers=new HttpHeaders().set('x-auth-token',this.getBasicAuth())
  return  this.http.post(`http://localhost:5000//publications/comment/${pub}`,{text:textarea})
  }
  deletecom(loadedPubs,loadedPubs1){
    const headers1=new HttpHeaders().set('x-auth-token',sessionStorage.getItem(this.SESSION_STORAGE_TOKEN_KEY))
    console.log(sessionStorage.getItem(this.SESSION_STORAGE_TOKEN_KEY))
    return this.http.delete("http://localhost:5000/publications/comment/"+loadedPubs,)

  }
}
