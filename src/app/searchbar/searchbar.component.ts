import { Component, HostListener } from '@angular/core';
import { UrlService } from '../url.service';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent {
  bookmarks: string[] = [];
  currentVideo: string = '';

  constructor(
    public videoService: VideoService,
    private urlService: UrlService
  ) {}

  ngOnInit(): void {
    this.getBookmarks();
    this.getCurrentVideo();
  }

  getBookmarks(): void {
    this.videoService
      .getBookmarks()
      .subscribe((bookmarks) => (this.bookmarks = bookmarks));
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

  @HostListener('window:beforeunload')
  doSomething() {
    if (!this.videoService.offline) return;
    this.videoService.saveBookmarks();
    this.videoService.saveHistory();
  }
}
