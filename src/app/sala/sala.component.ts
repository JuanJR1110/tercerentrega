import { Component, OnInit } from '@angular/core';
import { ParticipantesService } from '../servicios/participantes/participantes.service';
import { Sala } from '../clases/sala/sala';
import { SalaService } from '../servicios/sala/sala.service';
import { Participante } from '../clases/participante/participante';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Ganador } from '../clases/ganador/ganador';
import { GanadorService } from '../servicios/ganador/ganador.service';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.sass']
})
export class SalaComponent implements OnInit {
  participanteSubcription:Subscription=new Subscription
  public sala=new Sala();
  public participante=new Participante();
  public ganador= new Ganador()
  public num!:number
  public g!:string
  public g2!:string
  public mostrar=false
  constructor(
   public participantesService: ParticipantesService,
   public ganadorService:GanadorService,
   public salaService:SalaService,
   private router:ActivatedRoute
  ) { }

  ngOnInit(): void {


    this.participantesService.get$().subscribe((item:Sala)=>{
      this.sala=item
      const array: any[]=[];
      //guardo todos los numero en mi array
      item.participantes.forEach((ele,i)=>{
        array[i]=ele.id
      })

      //creo un aleatorio para buscar el numero ganador que va de 1 hasta el maximo de participantes
     //y lo guardo en la variable num_gandor
     let num_ganador= array[Math.floor(Math.random() *array.length)];
      this.sala.participantes.forEach(r=>{

      //recorro el arreglo para buscar el numero ganador, el numero ganador esta en la variable r.id
        if(r.id==num_ganador){
          //pasando el participante a la lista de ganadores
          this.ganador.fecha=this.sala.fecha
          this.ganador.id=r.sala
          this.ganador.id_user=r.identificacion
          this.ganador.nombre=r.nombre
          this.ganador.numero=r.id
          this.ganador.tipo=r.tipo
          //convierto la identificacion de numero a string y luego solo muestro los 4 ultimos caracteres
          let g1=String(r.identificacion)
        this.g2=g1.substr(-4);
        }
      })
    }
    )


    this.participantesService.eliminar$().subscribe((item2:Participante[])=>{
console.log("entr");


      item2.forEach(element => {
         this.participantesService.delete(element.id!).subscribe();
          console.log(element);

      });

    })
    this.num=Number(this.router.snapshot.paramMap.get('id'))
    this.participantesService.get(this.num).subscribe()

  }

  OnGanador(){

   this.mostrar=true
   this.ganadorService.create(this.ganador).subscribe();
  }

  OnDelete(){
     this.participantesService.eliminar(this.num).subscribe()
     this.salaService.delete(this.num).subscribe()
    }
}
