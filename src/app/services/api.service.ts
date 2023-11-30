import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private apiURL = 'http://localhost/api_responsi';

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/login.php`, data);
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/logout.php`);
  }
  
  
  lihatCatatan(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/lihatCatatan`);
  }

tambahCatatan(data: any, endpoint: string): Observable<any> {
  return this.http.post<any>(`${this.apiURL}/${endpoint}`, data);
}


  editCatatan(data: any, endpoint: string): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/${endpoint}`, data);
  }

  tampilCatatan(endpoint: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/${endpoint}`);
  }

  hapusCatatan(id: any, endpoint: string): Observable<any> {
  return this.http.delete<any>(`${this.apiURL}/${endpoint}/${id}`);
}

  lihat(id: any, endpoint: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/${endpoint}/${id}`);
  }
}
