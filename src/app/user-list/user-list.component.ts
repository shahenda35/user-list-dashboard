import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: any[] = [];
  page: number = 1;
  constructor(private http: HttpClient , private route : Router) { }

  ngOnInit(): void {
    this.fetchUserList();
  }

  fetchUserList() {
    this.http.get(`https://reqres.in/api/users?page=${this.page}`)
    .subscribe((data: any) => {
      const totalPages = data.total_pages;
      const requests = [];

      for (let page = 1; page <= totalPages; page++) {
        requests.push(this.http.get(`https://reqres.in/api/users?page=${page}`));
      }

      forkJoin(requests).subscribe((responses: any[]) => {
        this.users = responses.reduce((acc, response) => acc.concat(response.data), []);
      });
    });
  }

  viewUserDetail(userId : number){
    this.route.navigate(['/user', userId]);
  }
}
