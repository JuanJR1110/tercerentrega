import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { SalaComponent } from './sala/sala.component';
import { CrearSalaComponent } from './crear-sala/crear-sala.component';
import { EditarSalaComponent } from './actualizar-sala/editar-sala.component';
import { ParticipanteComponent } from './comprar/participante.component';
import { GanadoresComponent } from './lista-ganadores/ganadores.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    SalaComponent,
    CrearSalaComponent,
    EditarSalaComponent,
    ParticipanteComponent,
    GanadoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
