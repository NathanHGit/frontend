import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private currentVideo = new Subject<string>();
  private lastVideo: string = '';

  private bookmarks$ = new BehaviorSubject<string[]>([]);
  private history$ = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {
    this.init();
  }

  async init() {
    window.ononline = (e) => {
      this.saveBookmarks();
      this.saveHistory();
    };
    this.loadBookmarks();
    this.loadHistory();
  }

  setCurrentVideo(url: string) {
    if (this.lastVideo == url) return;
    this.lastVideo = url;
    this.currentVideo.next(url);
  }

  getCurrentVideo(): Observable<string> {
    return this.currentVideo.asObservable();
  }

  loadHistory() {
    this.http
      .get<string[]>('http://localhost:8000/history')
      .subscribe((data) => {
        this.history$.next(data);
      });
  }

  getHistory(): Observable<string[]> {
    return this.history$;
  }

  addToHistory(video: string) {
    let history = [video].concat(this.history$.getValue());
    localStorage.setItem('history', JSON.stringify(history));
    this.history$.next(history);
  }

  saveHistory() {
    return this.http
      .post<string>(
        'http://localhost:8000/history/save',
        JSON.stringify(this.history$.getValue())
      )
      .subscribe(() => {});
  }

  loadBookmarks() {
    this.http
      .get<string[]>('http://localhost:8000/bookmarks')
      .subscribe((data) => {
        this.bookmarks$.next(data);
      });
  }

  getBookmarks(): Observable<string[]> {
    return this.bookmarks$;
  }

  addToBookmarks(video: string) {
    const bookmarks = [video].concat(this.bookmarks$.getValue());
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    this.bookmarks$.next(bookmarks);
  }

  removeFromBookmarks(video: string) {
    const bookmarks = this.bookmarks$.getValue().filter((u) => u !== video);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    this.bookmarks$.next(bookmarks);
  }

  saveBookmarks() {
    return this.http
      .post<string>(
        'http://localhost:8000/bookmarks/save',
        JSON.stringify(this.bookmarks$.getValue())
      )
      .subscribe(() => {});
  }
}
