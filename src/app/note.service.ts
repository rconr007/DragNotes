import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Note {
  _id?: string;
  title: string;
  content: string;
  color: string;
  position: { x: number; y: number };
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:3000/api/notes'; // Make sure this matches your backend URL
  private notes: Note[] = [];
  private notesSubject = new BehaviorSubject<Note[]>([]);

  constructor(private http: HttpClient) {
    this.loadNotes();
  }

  private loadNotes() {
    this.http.get<Note[]>(this.apiUrl).subscribe(
      notes => {
        this.notes = notes;
        this.notesSubject.next([...this.notes]);
      },
      error => console.error('Error loading notes', error)
    );
  }

  getNotes(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  addNote(title: string, content: string, position: { x: number; y: number }) {
    const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf'];
    const newNote: Note = {
      title,
      content,
      color: colors[Math.floor(Math.random() * colors.length)],
      position
    };

    this.http.post<Note>(this.apiUrl, newNote).pipe(
      tap(createdNote => {
        this.notes.push(createdNote);
        this.notesSubject.next([...this.notes]);
      })
    ).subscribe();
  }

  updateNote(updatedNote: Note) {
    this.http.put<Note>(`${this.apiUrl}/${updatedNote._id}`, updatedNote).pipe(
      tap(returnedNote => {
        const index = this.notes.findIndex(note => note._id === returnedNote._id);
        if (index !== -1) {
          this.notes[index] = returnedNote;
          this.notesSubject.next([...this.notes]);
        }
      })
    ).subscribe();
  }

  deleteNote(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.notes = this.notes.filter(note => note._id !== id);
        this.notesSubject.next([...this.notes]);
      })
    ).subscribe();
  }
}
