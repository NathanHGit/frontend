import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent {
  @Input() bookmarks!: string[];
  @Output() sendUrlEvent = new EventEmitter<string>();

  loadVideo(url: any) {
    this.sendUrlEvent.emit(url);
  }
}
