import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit{
  constructor(private route : ActivatedRoute , private http: HttpClient) { }
  userId : number | undefined;
  userData : any
  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['id'];
    this.fetchUserDetail();
  }

  fetchUserDetail() {
    this.http.get(`https://reqres.in/api/users/${this.userId}`)
      .subscribe((data: any) => {
        this.userData = data.data;
      });

  }

}
