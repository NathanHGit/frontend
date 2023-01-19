import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent {
  @Input() history!: string[];
  @Output() sendUrlEvent = new EventEmitter<string>();

  loadVideo(url: any) {
    this.sendUrlEvent.emit(url);
  }
}
