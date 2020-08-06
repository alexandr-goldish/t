import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmitDataService {

    constructor(private http: HttpClient) {
    }

    public sendBlockToApi(blocks: number[]): Observable<{}> {
        return this.http.post('/api/block/', blocks);
    }
}
