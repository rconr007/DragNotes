import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../note.service';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="note" [style.background-color]="note.color">
      <input [(ngModel)]="note.title" (blur)="updateNote()" placeholder="Title">
      <textarea [(ngModel)]="note.content" (blur)="updateNote()" placeholder="Content"></textarea>
      <button (click)="deleteNote()">Delete</button>
    </div>
  `,
  styles: [`
    .note {
      width: 200px;
      min-height: 200px;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    input, textarea {
      width: 100%;
      border: none;
      background: transparent;
    }
    textarea {
      height: 150px;
      resize: vertical;
    }
    button {
      margin-top: 10px;
    }
  `]
})
export class NoteComponent {
  @Input() note!: Note;
  @Output() update = new EventEmitter<Note>();
  @Output() delete = new EventEmitter<string>();

  updateNote() {
    this.update.emit(this.note);
  }

  deleteNote() {
    if (this.note._id) {
      this.delete.emit(this.note._id);
    }
  }
}
