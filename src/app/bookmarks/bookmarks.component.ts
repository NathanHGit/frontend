import { Component } from '@angular/core';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent {
  bookmarks: String[] = [];

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.getBookmarks();
  }

  loadVideo(url: any) {
    this.videoService.setCurrentVideo(url);
  }

  getBookmarks(): void {
    this.videoService
      .getBookmarks()
      .subscribe((bookmarks) => (this.bookmarks = bookmarks));
  }
}
