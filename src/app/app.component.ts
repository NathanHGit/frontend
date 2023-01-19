import { Component, OnInit } from '@angular/core';
import { VideoService } from './video.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = "frontend";
  currentVideo: string = "";
  history: string[] = [];
  bookmarks: string[] = [];
  isHistoryDisplayed: boolean = true;
  nav!: NodeListOf<Element>;

  constructor(private videoService: VideoService, private titleService: Title) { }

  ngOnInit(): void {
    this.getHistory();
    this.getBookmarks();
    this.titleService.setTitle("YouTube player");
    this.nav = document.querySelectorAll("#nav h3");
  }

  getHistory(): void {
    this.videoService.getHistory().subscribe(history => (this.history = history));
  }

  getBookmarks(): void {
    this.videoService.getBookmarks().subscribe(bookmarks => (this.bookmarks = bookmarks));
  }

  // switch between history and bookmarks
  changeDisplay(event: any): void {
    if (!event.target.classList.contains("active"))
      this.isHistoryDisplayed = !this.isHistoryDisplayed;
  }

  // url rewrite 
  setUrl(url: string) {
    url = url.replace("/shorts", "")
    url = url.replace("watch?v=", "")
    url = url.replace("youtu.be", "www.youtube.com")

    if (!url.includes('embed')) {
      const array = url.split("/");
      array.splice(array.length - 1, 0, "embed");
      url = array.join("/");
      const parameters = url.split("&");
      url = parameters[0];
    }

    this.checkIfImageExists("http://img.youtube.com/vi/" + url.split("/").pop() + "/mqdefault.jpg", (exists: any) => {
      if (exists.width != 120) { // default format (no image → no video)
        this.loadVideo(url);
        this.history.unshift(url);
        this.videoService.addToHistory(url).subscribe();
      } else {
        this.currentVideo = "";
      }
    });
  }

  // check if video youtube exists, avoid iframe null loading issue
  checkIfImageExists(url: string, callback: any) {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      callback(img);
    };
  }

  // set video
  loadVideo(url: string) {
    if (this.currentVideo != url)
      this.currentVideo = url;
  }

  // add or remove of bookmarks
  setToBookmark() {
    if (this.bookmarks.includes(this.currentVideo)) {
      this.bookmarks = this.bookmarks.filter(v => v !== this.currentVideo);
      this.videoService.removeFromBookmarks(this.currentVideo).subscribe();
    } else {
      this.bookmarks.unshift(this.currentVideo);
      this.videoService.addToBookmarks(this.currentVideo).subscribe();
    }
  }
}
