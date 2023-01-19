import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) { }

  getHistory(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8000/history');
  }

  addToHistory(video: string) {
    return this.http.post<string>('http://localhost:8000/history/add', video);
  }

  getBookmarks(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:8000/bookmarks');
  }

  addToBookmarks(video: string) {
    return this.http.post<string>('http://localhost:8000/bookmarks/add', video);
  }

  removeFromBookmarks(video: string) {
    return this.http.post('http://localhost:8000/bookmarks/remove', video);
  }
}
