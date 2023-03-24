import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css'],
})
export class VideoViewComponent {
  currentVideo: string = '';
  safeUrl!: SafeUrl;

  constructor(
    public videoService: VideoService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.getCurrentVideo();
  }

  getCurrentVideo() {
    this.videoService.getCurrentVideo().subscribe((currentVideo) => {
      this.currentVideo = currentVideo;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.currentVideo
      );
    });
  }
}
