import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiPaths } from 'src/app/enums/api-paths.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  login(body: LoginPayload): Observable<boolean> {
    return this.httpClient.post(`${this.baseUrl}/${ApiPaths.Login}`, body).pipe(
      map((response: any) => {
        return response.result[0].isAuthorized;
      })
    );
  }
}

export interface LoginPayload {
  username: string;
  password: string;
}
