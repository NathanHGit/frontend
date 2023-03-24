import { Injectable } from '@angular/core';
import { VideoService } from './video.service';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  constructor(private videoService: VideoService) {}

  // url rewrite
  setUrl(url: string) {
    url = url.replace('/shorts', '');
    url = url.replace('watch?v=', '');
    url = url.replace('youtu.be', 'www.youtube.com');

    if (!url.includes('embed')) {
      const array = url.split('/');
      array.splice(array.length - 1, 0, 'embed');
      url = array.join('/');
      const parameters = url.split('&');
      url = parameters[0];
    }

    this.checkIfImageExists(
      'http://img.youtube.com/vi/' + url.split('/').pop() + '/mqdefault.jpg',
      (exists: any) => {
        const input = <HTMLInputElement>document.querySelector('#video_url');
        if (exists.width != 120) {
          // default format (no image → no video)
          this.videoService.setCurrentVideo(url);
          this.videoService.addToHistory(url);
        } else {
          this.videoService.setCurrentVideo('');
          input.setCustomValidity(' ');
          setTimeout(function () {
            input.setCustomValidity('');
          }, 500);
        }
      }
    );
  }

  // check if video youtube exists, avoid iframe null loading issue
  checkIfImageExists(url: string, callback: any) {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      callback(img);
    };
  }
}
