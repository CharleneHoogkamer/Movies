import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieOverviewComponent } from './movie-overview/movie-overview.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  declarations: [MovieOverviewComponent],
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCheckboxModule],
})
export class MovieModule {}
