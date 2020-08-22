import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { from, Observable, of, BehaviorSubject } from 'rxjs';
import { Post } from '../models/Post';
import { catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BaseHttpServiceService {
    private apiUrl = environment.api_url;
    httpError$: BehaviorSubject<HttpErrorResponse> = new BehaviorSubject(null);

    constructor(private httpClient: HttpClient) {
    }

    getAll(path, query? ,tokenRequired?: boolean): Observable<any> {
        return query ? this.httpClient.get(`${this.apiUrl}/${path}`, {params: query}) : this.httpClient.get(`${this.apiUrl}/${path}`);
    }

    post(path , body) {
        return this.httpClient.post(`${this.apiUrl}/${path}` , body);
    }
    put(path , body) {
        return this.httpClient.put(`${this.apiUrl}/${path}` , body);
    }
    delete(path) {
        return this.httpClient.delete(`${this.apiUrl}/${path}`);
    }
    getById(path, id) {
        return this.httpClient.get(`${this.apiUrl}/${path}/${id}`);
    }

    upload(path, body) {

        return this.httpClient.post(`${this.apiUrl}/${path}` , body, {headers : {'s-Type': 'ddd'}} );
    }
}
