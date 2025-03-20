import { Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { RequisicaoPageComponent } from './components/pages/requisicao-page/requisicao-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent }, // Rota padrão
    { path: 'requisicao/fex', component: RequisicaoPageComponent }, // Rota padrão
  ];