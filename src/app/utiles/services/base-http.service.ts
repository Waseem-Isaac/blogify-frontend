import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

    getAll(path, tokenRequired?: boolean) {
        return this.httpClient.get(`${this.apiUrl}/${path}`);
        // return this.httpClient.get(`${this.apiUrl}/${path}`, {headers : { authorization : this._jwt}});
    }
    getAllById(path, id) {
        return this.httpClient.get(`${this.apiUrl}/${path}/${id}`);
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
    getById(id) {}

}
