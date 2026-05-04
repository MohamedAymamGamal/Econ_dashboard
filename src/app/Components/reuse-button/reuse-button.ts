import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonType} from '../../../types/BottonTypes';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-reuse-button',
  imports: [
    Button
  ],
  templateUrl: './reuse-button.html',
  styleUrl: './reuse-button.css',
})
export class ReuseButton {

  @Input() label: string = '';
  @Input({required:true}) type: ButtonType = 'button';
  @Input() icon = '';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() styleClass: string = '';
  @Output() onClick = new EventEmitter<void>();

}
