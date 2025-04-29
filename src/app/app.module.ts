import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({"projectId":"flavorshare-222f4","appId":"1:76917660470:web:4439321a8d35587a973197","storageBucket":"flavorshare-222f4.firebasestorage.app","apiKey":"AIzaSyBgmfXcOa5T6kYoI6bL0uNXvA1hTiHZBLk","authDomain":"flavorshare-222f4.firebaseapp.com","messagingSenderId":"76917660470"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
