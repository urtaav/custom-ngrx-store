import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CharacterAdapter } from '@app/adapters';
import { Character, CharacterInfo } from '@app/models';
import { catchError, delay, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private readonly baseUrl: string = 'https://rickandmortyapi.com/api/character';

  readonly #http = inject(HttpClient);

  getAllCharacters = (): Observable<Character[]> =>
    this.#http.get<CharacterInfo>(this.baseUrl).pipe(map(info => CharacterAdapter(info)),delay(5000))

  addCharacter = (character: Omit<Character, 'id'>): Observable<void> =>
    this.#http.post<void>(this.baseUrl, { character }).pipe(catchError(() => Promise.resolve()));

  removeCharacter = (characterId: number): Observable<void> =>
    this.#http.delete<void>(`${this.baseUrl}/${characterId}`).pipe(catchError(() => Promise.resolve()));

  updateCharacter = (character: Character): Observable<void> => 
    this.#http.put<void>(this.baseUrl, { character }).pipe(catchError(() => Promise.resolve()));
}
