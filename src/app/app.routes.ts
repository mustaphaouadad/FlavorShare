import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { RecipeListComponent } from './features/recipe-list/recipe-list.component'; 
import { RecipeDetailComponent } from './features/recipe-detail/recipe-detail.component';



export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    { path: 'menu', component: RecipeListComponent },
    { path: 'recipe/:id', component: RecipeDetailComponent },

];
