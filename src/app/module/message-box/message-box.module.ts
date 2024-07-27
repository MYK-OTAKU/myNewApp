// src/app/message-box/message-box.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from '../../components/message-box/message-box.component';


@NgModule({
  declarations: [MessageBoxComponent],
  imports: [CommonModule],
  exports: [MessageBoxComponent]
})
export class MessageBoxModule {}
