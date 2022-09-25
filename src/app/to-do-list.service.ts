import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  constructor(private http: HttpClient) { }

  getToDoLists() {
    return this.http.get('/api/lists');
  }

  createToDoList(list) {
    return this.http.post('/api/lists', list);
  }

  updateList(listId, list) {
    return this.http.put('/api/lists/' + listId, list);
  }

  deleteList(listId) {
    return this.http.delete('/api/lists/' + listId);
  }
}
