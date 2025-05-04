import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private ratings: { [recipeId : string]: number} = {};

  constructor() { 
    const savedRatings = localStorage.getItem('recipeRatings');
    if(savedRatings){
      this.ratings =JSON.parse(savedRatings);
    }
  }

  setRating(recipeId: string, rating:number): void {
    this.ratings[recipeId] = rating;
    localStorage.setItem('recipeRatings',JSON.stringify(this.ratings)); 
  }
 
  getRating(recipeId: string): number {
    return this.ratings[recipeId] || 0;
  }
}
