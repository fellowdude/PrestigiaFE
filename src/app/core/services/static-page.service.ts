import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class StaticPagesService {
  constructor(private http: HttpClient) {}

  getPublicStaticPage(pageName: any) {
    const headers = new HttpHeaders()
      .set('key', 'Bearer ' + environment.JWT_TOKEN)
      .append('Content-type', 'application/json');
    return this.http.get(
      environment.BACKEND_URL + '/static-page/data/' + pageName,
      { headers }
    );
  }
  sendPublicFormData(formData: any) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Key', 'Bearer ' + environment.JWT_TOKEN);
    //.append('Authorization', 'Bearer ' + btoa(localStorage.getItem('jwt') || sessionStorage.getItem('jwt')));
    return this.http.post(
      environment.BACKEND_URL + '/email/send-email-template',
      formData,
      { headers }
    );
  }
}
