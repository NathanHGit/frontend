import { Component, Input } from '@angular/core';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent {
  @Input() bookmarks: String[] = [];

  constructor(private videoService: VideoService) {}

  loadVideo(url: any) {
    this.videoService.setCurrentVideo(url);
  }
}
