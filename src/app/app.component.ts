import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteListComponent } from './note-list/note-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NoteListComponent],
  template: `
    <h1>Draggable Notes</h1>
    <app-note-list></app-note-list>
  `,
  styles: [`
    :host {
      display: block;
      padding: 20px;
    }
    h1 {
      text-align: center;
    }
  `]
})
export class AppComponent {}
