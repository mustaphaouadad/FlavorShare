import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../core/services/recipe.service';
import { RatingService } from '../../core/services/rating.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    NavbarComponent
  ],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: any = null;
  ingredients: { name: string; measure: string }[] = [];
  rating: number = 0;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    private recipeService: RecipeService,
    private ratingService: RatingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRecipeDetails(id);
    } else {
      this.error = 'Invalid recipe ID';
    }
  }

  loadRecipeDetails(id: string): void {
    this.isLoading = true;
    this.error = null;
    this.recipeService.getRecipeById(id).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        this.rating = this.ratingService.getRating(id);
        this.extractIngredients(recipe);
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load recipe details. Please try again later.';
        console.error('Error fetching recipe:', error);
        this.isLoading = false;
      }
    });
  }

  extractIngredients(recipe: any): void {
    this.ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        this.ingredients.push({ name: ingredient, measure: measure || '' });
      }
    }
  }

  setRating(rating: number): void {
    if (this.recipe) {
      this.ratingService.setRating(this.recipe.idMeal, rating);
      this.rating = rating;
    }
  }
}