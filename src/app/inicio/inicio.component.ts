import { Component, OnInit } from '@angular/core';
import { SalaService } from '../servicios/sala/sala.service';
import { ParticipantesService } from '../servicios/participantes/participantes.service';
import { Sala } from '../clases/sala/sala';
import { Participante } from '../clases/participante/participante';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Ganador } from '../clases/ganador/ganador';
import { GanadorService } from '../servicios/ganador/ganador.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass']
})
export class InicioComponent implements OnInit{

  ganadorSubcription:Subscription=new Subscription
  salaSubcription:Subscription=new Subscription
  public sala=new Sala();
  public salas: Sala[]=[]
  public ganadores: Ganador[]=[]
  participanteSubcription:Subscription=new Subscription
  public participante=new Participante();
  public id!:number
  public val=0
  public cant=0
  constructor(
   public SalaService: SalaService,
   public ganadorService: GanadorService,
   public participantesService: ParticipantesService,
   private router:ActivatedRoute,
   private route: Router
  ) { }
  ngOnInit(): void {
    this.salaSubcription=this.SalaService.all$().subscribe((item:Sala[])=>{
      this.salas=item;
     this.salas.forEach(element => {
        console.log(element.activar);

      });

    }

  )

  this.SalaService.all().subscribe();

  }


}
