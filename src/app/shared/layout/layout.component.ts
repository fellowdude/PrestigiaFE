import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  showBlur = false;
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private location: Location) {}

  ngOnInit(): void {
    if(!this.activatedRoute.snapshot.queryParams['loggued']){
      setTimeout(() => {
        // Check if dni has been validated
        if (!sessionStorage.getItem('DOC_OK')) {
          this.showBlur = true;
        }
      }, 1000 * 10);
    }else{
      sessionStorage.setItem('DOC_OK', 'true');
      this.location.replaceState(this.route.url.split('?')[0])
    }

  }
}
