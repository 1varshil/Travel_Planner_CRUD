import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  addDataurl ='http://localhost:5000/add';
  constructor(private http :HttpClient) { }

  users (){
    return this.http.get(this.addDataurl)
  }
  saveUsers(data:any){
      return this.http.post(this.addDataurl,data, this.httpOptions);
  }

  showDataUrl = 'http://localhost:5000/data';
  displayUsers(){
    return this.http.get(this.showDataUrl);
  }

  deleteDataurl ='http://localhost:5000/data';
  deleteUsers(id:number){
      return this.http.delete(`${this.deleteDataurl}/${id}`);
  }

  updateDataUrl = 'http://localhost:5000/data';
  updateData(id: number, newData: any): Observable<any> {
    const url = `${this.updateDataUrl}/${id}`;
    return this.http.put(url, newData);
  }

  getDataById(id: number): Observable<any> {
    const url = `${this.updateDataUrl}/${id}`;
    return this.http.get(url);
  }
}
