import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ComponentRef, HostBinding,
  Input,
  OnInit, Renderer2, ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconType } from '@app/libs/shared';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomDialogHeaderComponent } from '@app/libs/features/custom-dialog-header/custom-dialog-header.component';
import { TranslateModule } from '@ngx-translate/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CustomDialogModel } from '@app/libs/core/models/features/dialog/dialog.model';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, CustomDialogHeaderComponent, TranslateModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit, AfterViewInit {
  @HostBinding('class.typography') enableTypography = true;

  @Input()
    title: string;

  @Input()
    headerIcon: IconType;

  @Input()
    showHeader = true;

  @Input()
    titleSize = 'big';

  @Input()
    closable: boolean;

  @Input()
    contentPadding = '2rem';

  @Input()
    breakpoints: { [key: string]: string };

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
    viewContainerRef: ViewContainerRef;

  componentRef: ComponentRef<any>;
  currentWidth: string;
  dialogContainerRef: Element;

  constructor(public ref: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig<CustomDialogModel>,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private breakpointObserver: BreakpointObserver) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.componentRef = this.viewContainerRef.createComponent(this.dialogConfig.data.componentType);
    this.renderer.addClass(this.componentRef.location.nativeElement, 'custom-dialog-content');

    this.title = this.dialogConfig.data.title;
    this.headerIcon = this.dialogConfig.data.headerIcon;
    this.showHeader = !this.dialogConfig.data.hideCustomHeader;
    this.titleSize = this.dialogConfig.data.titleSize ?? this.titleSize;
    this.contentPadding = this.dialogConfig.data.contentPadding ?? this.contentPadding;
    this.breakpoints = this.dialogConfig.data.breakpoints;

    this.dialogConfig.data?.input && Object.keys(this.dialogConfig.data.input).forEach(key => {
      this.componentRef.instance[key] = this.dialogConfig.data.input[key];
    });
    this.dialogContainerRef = document.getElementsByClassName('p-dynamic-dialog')?.[0];
    this.cdr.detectChanges();
    this.breakpoints && this.setupBreakpoints();
  }

  setupBreakpoints() {
    const sortedBreakpoints = Object.entries(this.breakpoints)
      .map(([key, value]) => ({
        breakpoint: key,
        width: value,
        query: `(min-width: ${key})`
      }))
      .sort((a, b) => parseInt(b.breakpoint) - parseInt(a.breakpoint));

    this.breakpointObserver
      .observe(sortedBreakpoints.map(bp => bp.query))
      .subscribe(result => {
        const matchingBreakpoint = sortedBreakpoints.find(bp => result.breakpoints[bp.query]);
        if (matchingBreakpoint) {
          this.currentWidth = matchingBreakpoint.width;
          this.renderer.setStyle(this.dialogContainerRef, 'width', this.currentWidth);
          this.cdr.detectChanges();
        }
      });
  }
}
