import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
  private headers = new Headers({'Content-Type': 'false'});
  
  constructor(private http: Http) { }

  upload(file: any) {
    let form = new FormData();
    
    form.append('file', file[0], file[0].name);

    return this.http
      .post('http://localhost:3000/upload', form).map(res => res.text());
  }
  
  handleError(error: any) {
    console.error('An error occurred', error);
  }
}