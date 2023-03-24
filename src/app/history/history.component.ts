import { Component } from '@angular/core';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  history: String[] = [];

  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.getHistory();
  }

  getHistory(): void {
    this.videoService
      .getHistory()
      .subscribe((history) => (this.history = history));
  }

  loadVideo(url: any) {
    this.videoService.setCurrentVideo(url);
  }
}
