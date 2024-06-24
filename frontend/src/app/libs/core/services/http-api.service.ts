import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpApiService {
  constructor(private http: HttpClient) {}

  public get<T>(path: string, params: { [key: string]: any } = {}): Observable<T> {
    const httpParams = this.toQueryParams(params);
    return this.http.get<T>(this.getUrl(path), { params: httpParams, responseType: 'json' });
  }

  public post<T>(path: string, params: { [key: string]: any } = {}): Observable<T> {
    return this.http.post<T>(this.getUrl(path), params);
  }

  public put<T>(path: string, params: { [key: string]: any } = {}): Observable<T> {
    return this.http.put<T>(this.getUrl(path), params);
  }

  public delete<T>(path: string, id: number): Observable<T> {
    return this.http.delete<T>(this.getUrl(path) + '/' + id);
  }

  public deleteList<T>(path: string, ids: number[]): Observable<T> {
    return this.http.delete<T>(this.getUrl(path), { body: { ids } });
  }

  public patch<T>(path: string, params: { [key: string]: any }) {
    const httpParams = this.toQueryParams(params);
    return this.http.patch<T>(this.getUrl(path), { params: httpParams, responseType: 'json' });
  }

  private getUrl(path: string) {
    return environment.apiUrl + '/' + path;
  }

  private toQueryParams(params: object, httpParams = new HttpParams(), prefix: string = ''): HttpParams {
    Object.keys(params).forEach((key) => {
      const value = params[key];
      const paramKey = prefix ? `${prefix}[${key}]` : key;

      if (typeof value === 'object' && value !== null) {
        httpParams = this.toQueryParams(value, httpParams, paramKey);
      } else {
        httpParams = httpParams.set(paramKey, value);
      }
    });

    return httpParams;
  }
}
