import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'langapp';

  topbarTheme = 'light';
  menuTheme = 'light';
  layoutMode = 'light';
  menuMode = 'static';
  isRTL = false;
  inputStyle = 'outlined';
  ripple = false;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/icons.svg'));
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
