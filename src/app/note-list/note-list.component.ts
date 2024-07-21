import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';
import { NoteService, Note } from '../note.service';
import { NoteComponent } from '../note/note.component';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, DragDropModule, NoteComponent],
  template: `
    <div class="note-list">
      <button (click)="addNote()">+ Add Note</button>
      <app-note *ngFor="let note of notes"
                [note]="note"
                (update)="updateNote($event)"
                (delete)="deleteNote($event)"
                cdkDrag
                (cdkDragEnded)="onDragEnded($event, note)"
                [cdkDragFreeDragPosition]="note.position"
                class="note-item">
      </app-note>
    </div>
  `,
  styles: [`
    .note-list {
      position: relative;
      width: 100%;
      height: calc(100vh - 100px);
      overflow: hidden;
    }
    .note-item {
      position: absolute;
    }
    button {
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 1000;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
  `]
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  addNote() {
    const position = { x: 50, y: 50 };
    this.noteService.addNote('New Note', '', position);
  }

  updateNote(note: Note) {
    this.noteService.updateNote(note);
  }

  deleteNote(id: string) {
    this.noteService.deleteNote(id);
  }

  onDragEnded(event: CdkDragEnd, note: Note) {
    note.position = { ...note.position, x: note.position.x + event.distance.x, y: note.position.y + event.distance.y };
    this.noteService.updateNote(note);
  }
}
