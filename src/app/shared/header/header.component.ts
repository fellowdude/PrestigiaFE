import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Section } from 'src/app/core/models/section.model';

@Component({
  host: {
    '(document:click)': 'forceClose($event)',
  },
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  sections: Section[];

  showSidebarMenu = false;
  ownClick = false;
  ownClickMenu = false;
  showSearchInput = false;

  @ViewChild('navbarLocationReference') navbarLocationReference: ElementRef<
    HTMLElement
  >;
  @ViewChild('header') header: ElementRef<HTMLElement>;
  menuExpandFrame1 = false;
  menuExpandFrame2 = false;
  menuExpandFrame3 = false;

  constructor(private route: ActivatedRoute, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    const options: IntersectionObserverInit = {
      root: null, // the viewport
      rootMargin: '-32px', // 2rem
      threshold: [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0],
    };
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this.renderer.setStyle(
          this.header.nativeElement,
          'opacity',
          Math.max(
            0,
            entry.intersectionRatio < 1.0 ? entry.intersectionRatio - 0.3 : 1
          )
        );
        this.menuExpandFrame1 = entry.intersectionRatio < 0.8;
        this.menuExpandFrame2 = entry.intersectionRatio < 0.6;
        this.menuExpandFrame3 = entry.intersectionRatio < 0.4;
      });
    }, options);
    observer.observe(this.navbarLocationReference.nativeElement);
  }

  ngOnInit(): void {
    // Get the sections data from the resolver
    this.sections = this.route.snapshot.data['sections'];
  }

  toggleSidebarMenu(value: boolean) {
    this.ownClickMenu = true;
    this.showSidebarMenu = value;
  }

  toggleSearch() {
    this.ownClick = true;
    this.showSearchInput = !this.showSearchInput;
  }

  forceClose(event: any) {
    if (event?.toElement?.localName != "input" && this.showSearchInput){
      if (!this.ownClick) {
        this.showSearchInput = false;
      } else {
        this.ownClick = false;
      }
    }
    if(this.showSidebarMenu){
      if (!this.ownClickMenu) {
        this.showSidebarMenu = false;
      } else {
        this.ownClickMenu = false;
      }
    }
  }
}
