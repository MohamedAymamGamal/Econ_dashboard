import { Component } from '@angular/core';
import { AppMode, mode } from '../../../service/mode';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mode-switcher',
  imports: [
    ToggleSwitchModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './mode-switcher.html',
  styleUrl: './mode-switcher.css',
})
export class ModeSwitcher {


  constructor(private modeService: mode) {
    this.currnetMode = this.modeService.current;

   }

  currnetMode!:AppMode;

  toggleMode() {

    this.currnetMode = this.modeService.current === 'dark-mode' ? 'light-mode' : 'dark-mode';
    this.modeService.toggle();

  }


}
