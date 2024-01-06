import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StaticPagesService } from 'src/app/core/services/static-page.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-complaints-book',
  templateUrl: './complaints-book.component.html',
  styleUrls: ['./complaints-book.component.scss'],
})
export class ComplaintsBookComponent implements OnInit, OnDestroy {
  subscriptions: Array<Subscription> = [];
  cptBook: any;
  contactForm: FormGroup;
  group: any = {};
  objForm: any = {};
  loading: boolean = false;
  showErrorMessage: boolean = false;
  showSuccessMessage: boolean = false;

  constructor(private staticPagesService: StaticPagesService) {}

  ngOnInit() {
    this.loading = true;
    this.subscriptions.push(
      this.staticPagesService
        .getPublicStaticPage('libro_de_reclamaciones')
        .subscribe((response) => {
          console.log(response);
          this.cptBook = response;
          this.cptBook.contenido_libro_de_reclamaciones.value.forEach(
            (element: any) => {
              if (element.type != 'instruction') {
                let validators = [];
                if (element.required) {
                  validators.push(Validators.required);
                }
                if (element.type == 'text' && element.type == 'email') {
                  validators.push(Validators.email);
                }
                if (element.type == 'text' && element.type == 'number') {
                  validators.push(Validators.min(0));
                }
                this.group[element.field] = new FormControl(null, validators);
              }
            }
          );
          this.contactForm = new FormGroup(this.group);
          this.loading = false;
        })
    );
  }
  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
  sendForm() {
    if (this.contactForm.valid) {
      this.loading = true;
      this.objForm = {
        data: { ...this.contactForm.value },
        id_form_email: this.cptBook.contenido_libro_de_reclamaciones
          .id_form_email,
      };
      this.staticPagesService.sendPublicFormData(this.objForm).subscribe(() => {
        this.contactForm.reset(this.contactForm);
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
        this.loading = false;
      });
    } else {
      console.log('no enviado');
      this.showErrorMessage = true;
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 3000);
    }
  }
}
