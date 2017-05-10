import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {
  private headers = new Headers({'Content-Type': 'false'});
  
  constructor(private http: Http) { }

  upload(file: any): Promise<any> {
  	let form = new FormData();
  	
  	form.append('file', file[0], file[0].name);

    return this.http
      .post('http://localhost:3000/upload', form)
      .toPromise()
      .then(res => res.text())
      .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}