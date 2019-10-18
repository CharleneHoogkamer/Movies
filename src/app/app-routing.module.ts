import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieOverviewComponent } from './modules/movie/movie-overview/movie-overview.component';

const routes: Routes = [{ path: '', component: MovieOverviewComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
