import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../core/services/recipe.service';
import { RatingService } from '../../core/services/rating.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    NavbarComponent
  ],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  menuItems: any[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  searchQuery: string = '';
  selectedCategory: string = 'All';
  categories: string[] = ['All', 'Beef', 'Chicken', 'Dessert', 'Pasta', 'Seafood', 'Vegetarian'];

  constructor(
    private recipeService: RecipeService,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.loadAllRecipes();
  }

  loadAllRecipes(): void {
    this.isLoading = true;
    this.error = null;
    this.recipeService.getAllRecipes().subscribe({
      next: (recipes) => {
        this.menuItems = recipes.map(recipe => ({
          id: recipe.idMeal,
          name: recipe.strMeal,
          image: recipe.strMealThumb,
          description: recipe.strInstructions ? recipe.strInstructions.substring(0, 100) + '...' : 'No description available',
          rating: this.ratingService.getRating(recipe.idMeal)
        }));
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load recipes. Please try again later.';
        console.error('Error fetching recipes:', error);
        this.isLoading = false;
      }
    });
  }

  searchRecipes(): void {
    if (!this.searchQuery.trim()) {
      this.loadAllRecipes();
      return;
    }
    this.isLoading = true;
    this.error = null;
    this.recipeService.searchRecipesByName(this.searchQuery).subscribe({
      next: (recipes) => {
        this.menuItems = recipes.map(recipe => ({
          id: recipe.idMeal,
          name: recipe.strMeal,
          image: recipe.strMealThumb,
          description: recipe.strInstructions ? recipe.strInstructions.substring(0, 100) + '...' : 'No description available',
          rating: this.ratingService.getRating(recipe.idMeal)
        }));
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to search recipes. Please try again later.';
        console.error('Error searching recipes:', error);
        this.isLoading = false;
      }
    });
  }

  filterByCategory(): void {
    if (this.selectedCategory === 'All') {
      this.loadAllRecipes();
      return;
    }
    this.isLoading = true;
    this.error = null;
    this.recipeService.getRecipesByCategory(this.selectedCategory).subscribe({
      next: (recipes) => {
        this.menuItems = recipes.map(recipe => ({
          id: recipe.idMeal,
          name: recipe.strMeal,
          image: recipe.strMealThumb,
          description: 'No description available', // getRecipesByCategory doesn't return strInstructions
          rating: this.ratingService.getRating(recipe.idMeal)
        }));
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to filter recipes. Please try again later.';
        console.error('Error filtering recipes:', error);
        this.isLoading = false;
      }
    });
  }

  setRating(recipeId: string, rating: number): void {
    this.ratingService.setRating(recipeId, rating);
    this.menuItems = this.menuItems.map(item =>
      item.id === recipeId ? { ...item, rating } : item
    );
  }
}
