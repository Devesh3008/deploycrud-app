import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpolyeeService {

  constructor(private _http: HttpClient) { }
addEmpolyee(data:any) :Observable<any> {
  return this._http.post('http://localhost:3000/empolyee',data);
}
updateEmpolyee(id:number,data:any) :Observable<any> {
  return this._http.post(`http://localhost:3000/empolyee/${id}`,data);
}
getEmpolyeeList() :Observable<any> {
  return this._http.get('http://localhost:3000/empolyee');
}

deleteEmpolyee() :Observable<any> { 
return this._http.delete(`http://localhost:3000/empolyee/${'id'}`);

}
}