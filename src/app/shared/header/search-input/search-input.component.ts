import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent {
  searchForm = new FormGroup({
    searchValue: new FormControl(''),
  });

  constructor(private router: Router) {}

  submitSearch() {
    this.router.navigate([
      '/search',
      this.searchForm.get('searchValue')?.value,
    ]);
  }
}
