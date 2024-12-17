import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    redirectTo: 'registro',
    pathMatch: 'full'
  },
  {
    path: 'calendario',
    redirectTo: 'calendario',
    pathMatch: 'full'
  },
  {
    path: 'cambio-contrasenia',
    redirectTo: 'cambio-contrasenia',
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'principal',
    redirectTo: 'principal',
    pathMatch: 'full'
  },
  {
    path: 'cuenta',
    redirectTo: 'cuenta',
    pathMatch: 'full'
  },
  {
    path: 'horario',
    redirectTo: 'horario',
    pathMatch: 'full'
  },
  {
    path: 'mapa',
    redirectTo: 'mapa',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'e404', //este path SIEMPRE DEBE SER EL ULTIMO
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule),
  },
  {
    path: 'e404',
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule),
  },
  {
    path: 'cambio-contrasenia',
    loadChildren: () => import('./pages/cambioContrasenia/cambio-contrasenia.module').then( m => m.CambioContraseniaPageModule),
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./pages/cuenta/cuenta.module').then( m => m.CuentaPageModule),
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule),
  },
  {
    path: 'horario',
    loadChildren: () => import('./pages/horario/horario.module').then( m => m.HorarioPageModule),
  },
  {
    path: 'calendario',
    loadChildren: () => import('./pages/calendario/calendario.module').then( m => m.CalendarioPageModule),
  },
  {
    path: 'create-note',
    loadChildren: () => import('./create-note/create-note.module').then( m => m.CreateNotePageModule)
  },
  {
    path: 'crear-notas',
    loadChildren: () => import('./pages/crear-notas/crear-notas.module').then( m => m.CrearNotasPageModule)
  },
  {
    path: 'recuperar-contrasenia',
    loadChildren: () => import('./pages/recuperar-contrasenia/recuperar-contrasenia.module').then( m => m.RecuperarContraseniaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
