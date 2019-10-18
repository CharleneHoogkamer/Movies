import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/shared/services/movie.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-movie-overview',
  templateUrl: './movie-overview.component.html',
  styleUrls: ['./movie-overview.component.scss'],
})
export class MovieOverviewComponent implements OnInit {
  public movies;
  public genres;

  public filteredMovies;
  public filteredGenres = [];

  public searchTerm$ = new BehaviorSubject<string>('');
  public isShow = false;
  public doneLoading = false;
  posterBaseUrl = environment.posterBaseUrl;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getAllMovies();
    this.getAllGenres();
  }

  // Filters movies by genre.
  filterByGenre(id) {
    if (this.filteredGenres.find(x => x === id)) {
      this.filteredGenres = this.filteredGenres.filter(item => item !== id);
    } else {
      this.filteredGenres.push(id);
    }
    var filteredList = this.movies;
    this.filteredGenres.forEach(genre => {
      filteredList = filteredList.filter(x => x.genre_ids.includes(genre));
    });

    this.filteredMovies = filteredList;
  }

  // Retrieves all movies from API (via movieservice).
  private getAllMovies() {
    this.movieService.search(this.searchTerm$).subscribe(results => {
      this.movies = results['results'];
      this.filteredMovies = this.movies;
      this.doneLoading = true;
    });
  }

  // Retrieves all genres from API (via movieservice).
  private getAllGenres() {
    this.movieService.getAllGenres().subscribe(results => {
      this.genres = results['genres'];
    });
  }

  // Retrieves genres by genre id.
  getGenreById(id) {
    return this.genres.filter(x => x.id === id)[0].name;
  }

  // Shows or hides the category filter.
  toggleCategoryFilter() {
    this.isShow = !this.isShow;
  }
}
