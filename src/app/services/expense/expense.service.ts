import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiPaths } from 'src/app/enums/api-paths.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  addExpense(body: AddExpensePayload): Observable<any> {
    return this.httpClient
      .post(`${this.baseUrl}/${ApiPaths.AddExpense}`, body)
      .pipe(
        map((response: any) => {
          return response.result[0];
        })
      );
  }
}

export interface AddExpensePayload {
  amount: number;
  description: string;
  userId: number;
  method: string;
}
