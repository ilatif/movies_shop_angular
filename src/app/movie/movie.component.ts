import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  isLoading = false;
  movie = null;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService) { }

  ngOnInit(): void {
    this.isLoading = true;

    const key = this.activatedRoute.snapshot.params['movie-key'];
    this.movieService
      .getList()
      .subscribe((movies: any[]) => {
        this.isLoading = false;
        this.movie = movies.find((movie) => movie.key === key);
        if (!this.movie) {
          this.router.navigate(['404'], { skipLocationChange: true });
        }
      })
  }

}
