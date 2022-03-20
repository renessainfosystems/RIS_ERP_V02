import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    templateUrl: './file.component.html',
    providers: [MessageService]
})
export class FileComponent {

    //start grid and form show hide ********************
    gridDisplay = false;
    formDisplay = true;
    toggleGridDisplay() {
        this.gridDisplay = true;
        this.formDisplay = false;
    }
    toggleFormDisplay() {
        this.gridDisplay = false;
        this.formDisplay = true;
    }
   //end grid and form show hide ********************

    uploadedFiles: any[] = [];

    constructor(private messageService: MessageService) {}

    onUpload(event) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }
}
