import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent {
  @Input() type: 'success' | 'error' | 'warning' | 'confirmation' = 'success';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() icon: string = '';

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<boolean>();

  onClose() {
    this.close.emit();
  }

  onConfirm(result: boolean) {
    this.confirm.emit(result);
  }
}
