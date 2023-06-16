import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DosyaComponent } from './components/dosya/dosya.component';
import { DersComponent } from './components/ders/ders.component';
import { DerslisteleComponent } from './components/derslistele/derslistele.component';
import { DosyalisteleComponent } from './components/dosyalistele/dosyalistele.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  }, 
   {
    path:'dosya',
    component:DosyaComponent
  },

  {
    path:'ders',
    component:DersComponent
  },

  {
    path:'derslistele/:dosyaId',
    component:DerslisteleComponent
  },

  {
    path:'dosyalistele/:dersId',
    component:DosyalisteleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
