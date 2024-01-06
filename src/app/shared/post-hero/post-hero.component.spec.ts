import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHeroComponent } from './post-hero.component';

describe('PostHeroComponent', () => {
  let component: PostHeroComponent;
  let fixture: ComponentFixture<PostHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostHeroComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
