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

  getAllTasks() {
    return this.http.get('/api/tasks');
  }

  getTasksByListId(listId) {
    return this.http.get('/api/lists/' + listId + '/tasks');
  }

  createTask(listId, task) {
    return this.http.post('/api/lists/' + listId + '/tasks', task);
  }

  updateTask(listId, taskId, task) {
    return this.http.put('/api/lists/' + listId + '/tasks/' + taskId, task);
  }

  deleteTask(listId, taskId) {
    return this.http.delete('/api/lists/' + listId + '/tasks/' + taskId);
  }
}
