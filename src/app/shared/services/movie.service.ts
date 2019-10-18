import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

// Does calls to The MovieDB API
export class MovieService {
  private apiKey = environment.apiKey;
  private BASE_API_URL: string = 'https://api.themoviedb.org/3';
  private BASE_SETTINGS_URL: string = 'api_key=' + this.apiKey + '&language=nl-NL&language=nl-NL&include_adult=false';
  private BASE_QUERY_URL: string = '&query=';

  private BASE_GENRE_URL: string = this.BASE_API_URL + '/genre/movie/list?' + this.BASE_SETTINGS_URL;
  private BASE_SEARCH_MOVIES_URL: string = this.BASE_API_URL + '/search/movie?' + this.BASE_SETTINGS_URL + this.BASE_QUERY_URL;
  private BASE_ALL_MOVIES_URL: string = this.BASE_API_URL + '/movie/popular?' + this.BASE_SETTINGS_URL;

  constructor(private http: HttpClient) {}

  // On keyup in searchbar, retrieve movies
  public search(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => this.searchMovies(term)),
    );
  }

  // If searchterm is present get filtered movies, else get movies.
  public searchMovies(searchTerm) {
    return searchTerm ? this.http.get(this.BASE_SEARCH_MOVIES_URL + searchTerm) : this.http.get(this.BASE_ALL_MOVIES_URL);
  }

  // Get all genres
  public getAllGenres() {
    return this.http.get(this.BASE_GENRE_URL);
  }
}
