import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaths } from 'src/app/enums/api-paths.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<any> {
    let url = `${this.baseUrl}/${ApiPaths.GetUsers}`;

    return this.httpClient.get(url);
  }

  getUserByUsername(username: number): Observable<any> {
    let url = `${this.baseUrl}/${ApiPaths.GetUsers}?username=${username}`;

    return this.httpClient.get(url);
  }
}
