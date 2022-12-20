import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CrearSalaComponent } from './crear-sala/crear-sala.component';
import { EditarSalaComponent } from './actualizar-sala/editar-sala.component';
import { SalaComponent } from './sala/sala.component';
import { ParticipanteComponent } from './comprar/participante.component';
import { GanadoresComponent } from './lista-ganadores/ganadores.component';

const routes: Routes = [
  {path:'',redirectTo:'inicio',pathMatch:'full'},
  {path:"inicio",component:InicioComponent},
  {path:"crear",component:CrearSalaComponent},
  {path:"editar/:id",component:EditarSalaComponent},
  {path:"sala/:id",component:SalaComponent},
  {path:"comprar/:id",component:ParticipanteComponent},
  {path:"ganadores",component:GanadoresComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
