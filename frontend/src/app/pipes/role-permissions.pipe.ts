import { Pipe, PipeTransform } from '@angular/core';
import { SessionService } from '@app/services/session.service';

@Pipe({
  name: 'rolePermissions',
  standalone: true,
})
export class RolePermissionsPipe implements PipeTransform {
  constructor(private session: SessionService) {}

  transform(role: 'isAdmin' | 'isUser'): boolean {
    switch (role) {
      case 'isAdmin':
        return this.session.isAdmin;
      case 'isUser':
        return !this.session.isAdmin;
    }
  }
}
