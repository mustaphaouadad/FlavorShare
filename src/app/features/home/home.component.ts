import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RecipeService } from '../../core/services/recipe.service';
import { RatingService } from '../../core/services/rating.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    NavbarComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tendance: any[] = [];
  isLoading: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.loadTrendingRecipes();
  }

  loadTrendingRecipes(): void {
    this.isLoading = true;
    this.recipeService.getTrendingRecipes().subscribe({
      next: (recipes) => {
        this.tendance = recipes.map(recipe => ({
          id: recipe.idMeal,
          name: recipe.strMeal,
          image: recipe.strMealThumb,
          rating: this.ratingService.getRating(recipe.idMeal)
        }));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching trending recipes:', error);
        this.isLoading = false;
      }
    });
  }

  setRating(recipeId: string, rating: number): void {
    this.ratingService.setRating(recipeId, rating);
    this.tendance = this.tendance.map(item =>
      item.id === recipeId ? { ...item, rating } : item
    );
  }
}