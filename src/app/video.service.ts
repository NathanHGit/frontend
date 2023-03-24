import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {
    this.init();
  }

  private currentVideo = new Subject<string>();
  private lastVideo: string = '';
  public offline = false;

  private bookmarks$ = new BehaviorSubject<string[]>([]);
  private history$ = new BehaviorSubject<string[]>([]);

  async init() {
    this.http
      .get<string[]>('http://localhost:8000/connection')
      .pipe(catchError((error) => of(error)))
      .subscribe((data) => {
        if (data.status == 0) this.offline = true;
        this.loadBookmarks();
        this.loadHistory();
      });
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
    if (this.offline) {
      const history = JSON.parse(localStorage.getItem('history')!);
      if (history) this.history$.next(history);
    } else {
      this.http
        .get<string[]>('http://localhost:8000/history')
        .subscribe((data) => {
          this.history$.next(data);
        });
    }
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
    if (this.offline) {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks')!);
      if (bookmarks) this.bookmarks$.next(bookmarks);
    } else {
      this.http
        .get<string[]>('http://localhost:8000/bookmarks')
        .subscribe((data) => {
          this.bookmarks$.next(data);
        });
    }
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
