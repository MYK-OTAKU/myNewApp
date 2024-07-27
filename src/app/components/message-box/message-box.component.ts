// src/app/message-box/message-box.component.ts
import { Component, OnInit } from '@angular/core';
import { MessageBoxService } from '../../services/message-box.service';

type MessageType = 'success' | 'error' | 'confirm';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
  message: string = '';
  type: MessageType = 'success';
  show: boolean = false;
  confirmationCallback?: (result: boolean) => void;

  constructor(private messageBoxService: MessageBoxService) {}

  ngOnInit(): void {
    this.messageBoxService.messageBoxState.subscribe(state => {
      this.message = state.message;
      this.type = state.type;
      this.confirmationCallback = state.confirmation;
      this.show = true;
    });
  }

  close() {
    this.show = false;
  }

  confirm(result: boolean) {
    if (this.confirmationCallback) {
      this.confirmationCallback(result);
    }
    this.show = false;
  }

  getIcon() {
    switch (this.type) {
      case 'success':
        return 'assets/images/icons8-verified-100.png';
      case 'error':
        return 'assets/images/error-48.png';
      case 'confirm':
        return 'assets/images/warning-48.png';
      default:
        return '';
    }
  }

  getTitle() {
    switch (this.type) {
      case 'success':
        return 'Succès';
      case 'error':
        return 'Erreur';
      case 'confirm':
        return 'Confirmation';
      default:
        return '';
    }
  }
}
