import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiPaths } from 'src/app/enums/api-paths.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getBalanceByUserId(userId: number): Observable<string> {
    let url = `${this.baseUrl}/${ApiPaths.GetBalance}?userId=${userId}`;

    return this.httpClient.get(url).pipe(
      map((response: any) => {
        return response.result[0].amount;
      })
    );
  }
}
