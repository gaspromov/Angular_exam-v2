import { Injectable } from '@angular/core';
import { API } from '../API';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService extends API {

  header: HttpHeaders;
  url = "notes";

  constructor(httpClient: HttpClient) {
    super (httpClient);
    this.header = new HttpHeaders();
    this.header.set ('Content-type', 'application/json');
  }

  async getNotes() {
    return this.get(`${this.url}`, this.header).toPromise();
  }

  
  async getNotesById(id: number) {
    return this.get(`${this.url}/${id}`, this.header).toPromise();
  }


  async postNotes(data) {
    return this.post(`${this.url}`, data, this.header).toPromise();
  }

  async putNotes(id: number, data) {
    return this.put(`${this.url}/${id}`, data, this.header).toPromise();
  }

  async deleteNotes(id: number) {
    return this.delete(`${this.url}/${id}`, this.header).toPromise();
  }

  async getSort(){
    return this.get(`sort/1`, this.header).toPromise();
  }

  async putSort(data){
    return this.put(`sort/1`, data, this.header).toPromise();
  }

  async getFilter(){
    return this.get(`filter/1`, this.header).toPromise();
  }

  async putFilter(data){
    return this.put(`filter/1`, data, this.header).toPromise();
  }

}
