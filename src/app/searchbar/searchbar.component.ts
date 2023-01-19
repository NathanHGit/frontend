import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  @Input() video!: string;
  @Input() bookmarks!: string[];

  @Output() sendUrlEvent = new EventEmitter<string>();
  @Output() addToBookmarkEvent = new EventEmitter<string>();

  sendUrl(url: any) {
    this.sendUrlEvent.emit(url.value);
    url.value = "";
  }

  saveVideo() {
    this.addToBookmarkEvent.emit();
  }
}
