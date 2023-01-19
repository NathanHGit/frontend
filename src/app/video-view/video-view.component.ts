import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css'],
})
export class VideoViewComponent implements OnChanges {
  constructor(private sanitizer: DomSanitizer) {
  }

  @Input() video!: string;
  safeUrl!: SafeUrl;

  ngOnChanges() {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video);
  }
}
