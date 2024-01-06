import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomeService } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-blur-form',
  templateUrl: './blur-form.component.html',
  styleUrls: ['./blur-form.component.scss'],
})
export class BlurFormComponent {
  blurForm = new FormGroup({
    dni: new FormControl(null, [
      // Validators.min(10000000),
      // Validators.max(99999999),
      Validators.required,
    ]),
  });
  submitted = false;
  submittedInvalid = false;
  @Output() blurFormValidated = new EventEmitter<void>();

  constructor(private homeService: HomeService) {}

  @HostListener('document:keypress', ['$event']) onKeyPressHandler(event: KeyboardEvent) {
    if (event.code == 'Enter' && this.blurForm.valid) {
      this.submitSearch();
    }
  }

  submitSearch() {
    this.submitted = true;
    if (!this.blurForm.valid) {
      return;
    }
    this.homeService.validateDNI(this.blurForm.get('dni')?.value).subscribe(
      (valid) => {
        if (!valid) {
          this.submittedInvalid = true;
          this.blurForm.setValue({ dni: null });
          return;
        }
        sessionStorage.setItem('DOC_OK', 'true');
        this.blurFormValidated.emit();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
