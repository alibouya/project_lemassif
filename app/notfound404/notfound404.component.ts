import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notfound404',
  templateUrl: './notfound404.component.html',
  styleUrls: ['./notfound404.component.scss']
})
export class Notfound404Component implements OnInit {

  constructor(private activatedroute:ActivatedRoute) { }

  ngOnInit(): void {

    // this.activatedroute.params.subscribe((params)=>{
    //   //console.log(params)
    //     this.color=params.color;
    //   })
    //   this.activatedroute.queryParams.subscribe((qp)=>{
    //     console.log(qp);
  
    //   })
  }

}
