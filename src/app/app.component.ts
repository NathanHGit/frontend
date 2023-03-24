import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VideoService } from './services/video.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: string = 'frontend';
  isHistoryDisplayed: boolean = true;
  bookmarks: String[] = [];

  constructor(public videoService: VideoService, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('YouTube player');
    this.getBookmarks();
  }

  // switch between history and bookmarks
  changeDisplay(event: any): void {
    if (!event.target.classList.contains('active'))
      this.isHistoryDisplayed = !this.isHistoryDisplayed;
  }

  getBookmarks(): void {
    this.videoService
      .getBookmarks()
      .subscribe((bookmarks) => (this.bookmarks = bookmarks));
  }
}
