import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Note } from '../note.service';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="note" [style.background-color]="note.color">
      <div class="note-header">
        <input [(ngModel)]="note.title" (blur)="updateNote()" placeholder="Title" class="title-input">
        <div class="note-controls">
          <button (click)="toggleCollapse()" class="toggle-btn">
            <i [class]="isCollapsed ? 'chevron-down' : 'chevron-up'"></i>
          </button>
          <button (click)="deleteNote()" class="delete-btn" title="Delete note">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
      <div [@collapseAnimation]="isCollapsed ? 'collapsed' : 'expanded'" class="note-content">
        <textarea [(ngModel)]="note.content" (blur)="updateNote()" placeholder="Content"></textarea>
      </div>
    </div>
  `,
  styles: [`
    .note {
      width: 200px;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      margin: 10px;
      overflow: hidden;
    }
    .note-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
    }
    .title-input {
      border: none;
      background: transparent;
      font-weight: bold;
      flex-grow: 1;
    }
    .note-controls {
      display: flex;
    }
    .toggle-btn, .delete-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .toggle-btn:hover, .delete-btn:hover {
      background-color: rgba(0,0,0,0.1);
      border-radius: 50%;
    }
    .chevron-down::before {
      content: '▼';
    }
    .chevron-up::before {
      content: '▲';
    }
    .note-content {
      padding: 0 10px 10px;
    }
    textarea {
      width: 100%;
      border: none;
      background: transparent;
      resize: vertical;
      min-height: 100px;
    }
    .delete-btn svg {
      width: 16px;
      height: 16px;
    }
  `],
  animations: [
    trigger('collapseAnimation', [
      state('collapsed', style({
        height: '0',
        overflow: 'hidden',
        padding: '0 10px'
      })),
      state('expanded', style({
        height: '*',
        overflow: 'hidden'
      })),
      transition('expanded <=> collapsed', animate('300ms ease-in-out'))
    ])
  ]
})
export class NoteComponent {
  @Input() note!: Note;
  @Output() update = new EventEmitter<Note>();
  @Output() delete = new EventEmitter<string>();

  isCollapsed = false;

  updateNote() {
    this.update.emit(this.note);
  }

  deleteNote() {
    if (this.note._id) {
      this.delete.emit(this.note._id);
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
