import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {
  transform(duration: number): string {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = (duration % 60);
    if (hours >= 1) {
      return `${this.formatTime(hours)}:${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
    }
    return `${this.formatTime(minutes)}:${this.formatTime(seconds)}`;
  }

  private formatTime(input: number): string {
    return input.toString().padStart(2, '0');
  }
}
