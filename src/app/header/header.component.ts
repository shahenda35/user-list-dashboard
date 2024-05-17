import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  userId : number = 0
  showBackArrow: boolean = false;
  pageTitle: string = 'User List';
  title :boolean= false;
  private searchSubject = new Subject<string>();


  constructor(private http: HttpClient , private router :Router)  { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.showBackArrow = this.router.url.startsWith('/user');
      this.title= this.router.url.startsWith('/user'); 
    });

    this.searchSubject.pipe(
      debounceTime(300), 
      distinctUntilChanged() 
    ).subscribe((searchText) => {
      this.handleSearchChange(searchText);
    });
  }

  onSearchChange(searchText: string) {
    this.searchSubject.next(searchText);
  }

  handleSearchChange(searchText: string) {
    const userId = parseInt(searchText, 10); 
    if (!isNaN(userId) && userId <=12) {
      this.router.navigate(['/user', userId]);
    } else {
      this.router.navigate(['/']);
    }
  }

  goBack(){
    this.router.navigate(['/']);
  }
}
