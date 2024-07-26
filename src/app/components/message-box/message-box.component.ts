import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MessageBoxComponent {
  @Input() type: 'confirmation' | 'warning' | 'error' | 'question' = 'confirmation';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() isVisible: boolean = false;

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

  onClose() {
    this.close.emit();
  }
}
