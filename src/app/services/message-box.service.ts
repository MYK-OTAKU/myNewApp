// src/app/services/message-box.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

type MessageType = 'success' | 'error' | 'confirm';

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {
  private messageBoxSubject = new Subject<{ message: string, type: MessageType, confirmation?: (result: boolean) => void }>();
  messageBoxState = this.messageBoxSubject.asObservable();

  showMessage(message: string, type: MessageType) {
    this.messageBoxSubject.next({ message, type });
  }

  showConfirmation(message: string, confirmation: (result: boolean) => void) {
    this.messageBoxSubject.next({ message, type: 'confirm', confirmation });
  }
}
