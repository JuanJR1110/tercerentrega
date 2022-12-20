import { Component, OnInit } from '@angular/core';
import { ParticipantesService } from '../servicios/participantes/participantes.service';
import { Participante } from '../clases/participante/participante';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Sala } from '../clases/sala/sala';
import { SalaService } from '../servicios/sala/sala.service';

@Component({
  selector: 'app-participante',
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.sass']
})
export class ParticipanteComponent implements OnInit{
  
  participanteSubcription:Subscription=new Subscription
  public participante=new Participante();
  salaSubcription:Subscription=new Subscription
  public sala=new Sala();
  public id!:number
  public cant!:number
  constructor(
   public participantesService: ParticipantesService,
   public salaService:SalaService, 
   private router:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.participantesService.all$().subscribe((items:Participante[])=>{
      items.forEach(ul=>{
        this.cant=ul.id!+1
      })
      this.participante.id=this.cant
   } 
   )

   this.salaSubcription=this.participantesService.get$().subscribe((item:Sala)=>{
    this.sala=item
    let cant2=this.sala.participantes.length+1
    this.sala.cantidad=cant2
    this.sala.premio=Number(this.sala.valor)*cant2
    }
    )

    this.id=Number(this.router.snapshot.paramMap.get('id')) 
    this.participantesService.all().subscribe();
    this.participantesService.get(this.id).subscribe()
  }

  OnCreate(){
  console.log(this.sala.cantidad);
  
    if(this.participante.correo!=null && this.participante.identificacion!=null && this.participante.nombre && this.participante.tipo!=null){
      this.participante.sala=this.id
      this.participantesService.create(this.participante).subscribe();
      this.salaService.update(this.sala).subscribe()
      
      
  }else{
    alert("Revise los datos")
  }
  }
  

}
