import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { messages } from './app/adminroom/messagesformat';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessagesservivesService {
 

  constructor(private http: HttpClient) { }

  fetchPosts(){
    
    return this.http
    .get<any >("http://localhost:5000/messages")
    .pipe(
      __map(responseData => {
        console.log(responseData)
       
      return  responseData as Array<messages>
      

      }
    ))

  }

  sendmessage(name:string,
    phone:number,
    text:string,
    ){
      return this.http
        .post("http://localhost:5000/messages",{name:name,
        phone:phone,
        text:text,
       })
        
          }

  }

  //  return this.http
  //      .get<any >("http://localhost:5000/messages")
  //      .pipe(
  //       __map(responseData => {
  //         console.log(responseData)
  //         // const postsArray : pubs[] = [];
  //         // for (const key in responseData) {
  //         //   postsArray.push(key)
  //         // }
  //         //return postsArray;
  //       return  responseData as Array<user>
  //     //    map(responseData => {
  //     //      const postsArray : messages[] = [];
  //     //      for (const key in responseData) {
  //     //        if (responseData.hasOwnProperty(key)) {
  //     //          postsArray.push({ ...responseData[key], _id: key });
  //     //        }
  //     //      }
  //     //      return postsArray;
 
  //     //    })
  //     //  )
     

