import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'
import { MessageService } from 'primeng/api';
@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private toastr: ToastrService, private service: MessageService) { }
  ShowNotification(type, message) {

  if (type != 0) {
      if (type == 1) {
          this.service.add({ key: 'tst', severity: 'success', detail: message });
      //this.toastr.success(message);
    }
    else if (type == 2 ) {
          //this.toastr.warning(message);
          this.service.add({ key: 'tst', severity: 'warn', detail: message });
    }
    else if (type == 3) {
          //this.toastr.error(message);
          this.service.add({ key: 'tst', severity: 'error', detail: message });
    }
    else if (type == 4) {
          //this.toastr.info(message);
          this.service.add({ key: 'tst', severity: 'info', detail: message });
    }

  }

}
}
