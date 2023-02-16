import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  movies = [];
  genres = [];
  currentFilter = 'all';

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService
      .getList()
      .subscribe((movies: any[]) => {
        this.movies = movies;
        this.genres = this.prepareFilters(movies);
      });
  }

  prepareFilters(movies) {
    let genres = ['all'];
    movies.forEach((movie) => {
      movie.genres.forEach((genre) => {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      });
    });

    return genres;
  }

}
