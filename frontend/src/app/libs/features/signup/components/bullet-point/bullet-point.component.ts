import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@app/libs/shared';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-bullet-point',
  standalone: true,
  imports: [CommonModule, IconComponent, TranslateModule],
  templateUrl: './bullet-point.component.html',
  styleUrls: ['./bullet-point.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BulletPointComponent implements OnInit {

  @Input()
  text: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
