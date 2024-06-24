import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, of, switchMap } from 'rxjs';
import { ApiService } from '@app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Content, ContentAttributeResponse } from '@app/interfaces/common.interface';
import { MaterialViewComponent } from '@app/libs/features/material';
import { AttributeHelper } from '@app/libs/shared/helpers/attribute.helper';
import { routingConfig } from '@app/libs/config';
import { ContentAttributeUpdate } from '@app/libs/core/models/features/content/content-attribute-update.model';

@UntilDestroy()
@Component({
  selector: 'app-material-view-container',
  standalone: true,
  imports: [CommonModule, MaterialViewComponent],
  templateUrl: './material-view-container.component.html',
  styleUrls: ['./material-view-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialViewContainerComponent implements AfterViewInit {
  content: Content;
  languageLevels = this.api.getContentLevels();

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef, private router: Router) {}

  ngAfterViewInit(): void {
    this.activatedRoute.params
      .pipe(
        untilDestroyed(this),
        switchMap((params) => {
          const id = params.id;
          return this.api.contentById(Number(id));
        }),
        catchError((err) => {
          void this.router.navigateByUrl(routingConfig.notfound.fullPath);
          return of();
        })
      )
      .subscribe((content) => {
        console.log(content);
        this.content = content;
        this.cdr.detectChanges();
      });
  }

  sendReport(reason: string) {
    this.api
      .sendReport({
        contentId: this.content.id,
        userText: reason,
      })
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  setContentAttributes(updateAttribute: ContentAttributeUpdate): void {
    const updatedBody = AttributeHelper.getNewAttributeValues(updateAttribute, this.content?.contentAttribute);
    this.api
      .setContentStudiedAttribute(this.content.id, updatedBody)
      .pipe(untilDestroyed(this))
      .subscribe((response) => {
        this.handleContentAttributes(response);
      });
  }

  private handleContentAttributes(contentAttributes: ContentAttributeResponse) {
    this.content = {
      ...this.content,
      contentAttribute: {
        ...contentAttributes,
      },
    };
    this.cdr.detectChanges();
  }

  removeFromFeed(id: number): void {
    if (id) {
      this.api
        .setContentHiddenAttribute(id, {
          isHidden: true,
        })
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.content.recommendedVideos = this.content.recommendedVideos.filter((video) => video.id !== id);
          this.cdr.detectChanges();
        });
    }
  }
}
