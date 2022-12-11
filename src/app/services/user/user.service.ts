import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiPaths } from 'src/app/enums/api-paths.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<UserResponse[]> {
    let url = `${this.baseUrl}/${ApiPaths.GetUsers}`;

    return this.httpClient.get(url).pipe(
      map((data: any) => {
        return data.result;
      })
    );
  }

  getUserById(id: number): Observable<UserResponse | null> {
    let url = `${this.baseUrl}/${ApiPaths.GetUsers}?id=${id}`;

    return this.httpClient.get(url).pipe(
      map((data: any) => {
        if (data.result.length > 0) {
          return data.result[0];
        }
        return null;
      })
    );
  }
}

export interface UserResponse {
  id: number;
  username: string;
}
