import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  files: File;
  fileOneContent: any;
  fileTwoContent: any;
  fileOneContentArray: Array<any>;
  fileTwoContentArray: Array<any>;
  lines: Array<any> = [];

  constructor(
    private uploader: AppService
  ){}  


  uploadFile(event){
    this.uploader.upload(event.target.files).subscribe((content) => {
      if(event.target.name === 'fileone'){
          this.fileOneContent = content;
          this.fileOneContentArray = this.fileOneContent.split('\n').map((i) => i.trim());
      }
      if(event.target.name === 'filetwo'){
          this.fileTwoContent = content;
          this.fileTwoContentArray = this.fileTwoContent.split('\n').map((i) => i.trim());
      }
      this.compare();
    }, this.uploader.handleError);
  }

  compare(){
    if(!this.fileOneContentArray || !this.fileTwoContentArray){
      return;
    }
    let maxCount = Math.max(this.fileOneContentArray.length, this.fileTwoContentArray.length);
    let fA = this.fileOneContentArray;
    let sA = this.fileTwoContentArray;
    let isExist = (n) => n!== undefined;
    let push = this.lines.push;

    for(let n = 0; n < maxCount; n++){
      if(sA[n] === fA[n]){
        this.lines.push(sA[n]);
      } 
      else if(!~fA.indexOf(sA[n])){
        this.lines.push((isExist(fA[n]) ? ('* ' + fA[n] + '|') : '+ ') + sA[n]);
      }
      else if(!~sA.indexOf(fA[n])){
        this.lines.push('- ' + fA[n]);

        if(~fA.indexOf(sA[n])){
          this.lines.push(sA[n]);
        }
        fA.splice(n, 1);
      }
     }  
  }
}