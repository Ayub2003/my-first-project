import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../../app.config';
import { IUser } from '../models/users.model';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAPIService {
  constructor(private http: HttpClient, @Inject(API_URL) private url: string) {}

  public getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url + '/users');
  }

  public deleteUser(id: number): Observable<unknown> {
    return this.http.delete(this.url + `/users/${id}`);
  }

  public addUser(user: IUser): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.url + '/users', user);
  }

  public editUser(user: Partial<IUser>): Observable<IUser> {
    // console.log('[UserAPIService] editUser(): ',user)
    return this.http.patch<IUser>(this.url + `/users/${user.id}`, user);
  }
}
