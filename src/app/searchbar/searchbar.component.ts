import { Component, Input } from '@angular/core';
import { UrlService } from '../services/url.service';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent {
  @Input() bookmarks: String[] = [];
  currentVideo: string = '';

  constructor(
    public videoService: VideoService,
    private urlService: UrlService
  ) {}

  ngOnInit(): void {
    this.getCurrentVideo();
  }

  getCurrentVideo(): void {
    this.videoService
      .getCurrentVideo()
      .subscribe((currentVideo) => (this.currentVideo = currentVideo));
  }

  sendUrl(url: any) {
    this.urlService.setUrl(url.value);
    url.value = '';
  }

  isInBookmarks(video: string) {
    return !this.bookmarks.includes(video);
  }

  saveVideo() {
    this.bookmarks.includes(this.currentVideo)
      ? this.videoService.removeFromBookmarks(this.currentVideo)
      : this.videoService.addToBookmarks(this.currentVideo);
  }
}
