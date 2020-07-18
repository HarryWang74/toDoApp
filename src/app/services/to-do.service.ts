import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToDo } from '../models/todo';

@Injectable()
export class ToDoService {
  apiHost: 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  }

  getToDoList() {
    return this.http.get('http://localhost:3000/toDoList');
  }
}
