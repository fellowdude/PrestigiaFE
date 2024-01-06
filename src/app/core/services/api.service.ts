import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private BACKEND_URL = environment.BACKEND_URL;
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  createHttpParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((param) => {
      httpParams = httpParams.set(param, JSON.stringify(params[param]));
    });
    return httpParams;
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${this.BACKEND_URL}${path}`, {
        params,
        headers: {
          Authorization: `Bearer ${environment.JWT_TOKEN}`,
        },
      })
      .pipe(catchError(this.formatErrors));
  }
  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${environment.BACKEND_URL}${path}`, body, {
        headers: {
          Authorization: `Bearer ${environment.JWT_TOKEN}`,
        },
      })
      .pipe(catchError(this.formatErrors));
  }
}
