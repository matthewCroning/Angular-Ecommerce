import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageFileService {

  constructor(private http: HttpClient) { }

  imageUpload(imageForm: FormData){
    return this.http.post('/api/v1/upload', imageForm);
  }

  deleteFromAWS(object: any){
    return this.http.post('/api/productVariation/deleteFromAWS', {object: object});
  }
}
