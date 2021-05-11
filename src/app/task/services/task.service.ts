import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskDto } from '../dtos/task.dto';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  public list(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(environment.apiEndpoint + '/task');
  }

  public create(task: TaskDto): Observable<TaskDto> {
    return this.http.post<TaskDto>(environment.apiEndpoint + '/task', task);
  }

  public update(task: TaskDto): Observable<TaskDto> {
    return this.http.patch<TaskDto>(environment.apiEndpoint + '/task/' + task.id, task);
  }

  public delete(task: TaskDto): Observable<void> {
    return this.http.delete<void>(environment.apiEndpoint + '/task/' + task.id);
  }
}
