import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { user } from './usersdetails.model';
import { map as __map, filter as __filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { messages } from './app/adminroom/messagesformat';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class UsersserviceService {
  title:string;
  description:string;
  image:string;
  marque:string;
  constructor(private http: HttpClient) { }

  


  fetchUsers():Observable<Array<user>>{
    

    return this.http
        .get<any >("http://localhost:5000/users")
        .pipe(
          __map(responseData => {
            console.log(responseData)
            // const postsArray : pubs[] = [];
            // for (const key in responseData) {
            //   postsArray.push(key)
            // }
            //return postsArray;
          return  responseData as Array<user>
          
  
          })
        )
      
   }

   /********************************** */
   




   savepubli(title:string,
   description:string,
   image:string,
   marque:string){
    

    return this.http
        .post("http://localhost:5000/publications",{title:title,
        description:description,
        image:image,
        marque:marque})
        
          }
   
}
