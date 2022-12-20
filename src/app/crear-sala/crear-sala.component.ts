import { Component, OnInit } from '@angular/core';
import { SalaService } from '../servicios/sala/sala.service';
import { Sala } from '../clases/sala/sala';
import { Subscription } from 'rxjs';
import { Ganador } from '../clases/ganador/ganador';
import { GanadorService } from '../servicios/ganador/ganador.service';

@Component({
  selector: 'app-crear-sala',
  templateUrl: './crear-sala.component.html',
  styleUrls: ['./crear-sala.component.sass']
})

export class CrearSalaComponent implements OnInit{
  
  salaSubcription:Subscription=new Subscription
  public sala=new Sala();
  public ganador= new Ganador()
  public ganadores:Ganador[] =[]
  public opcional!:number
  constructor( 
    public SalaService: SalaService,
    public ganadorService:GanadorService
    )
   { }

  ngOnInit(): void {
    
    this.salaSubcription=this.SalaService.all$().subscribe((item:Sala[])=>{
      item.forEach(e => {
        this.sala.id=Number(e.id)+1
        
      });
    
    } 
    
  )
  this.ganadorService.all$().subscribe((items:Ganador[])=>{
    this.ganadores=items
    
    this.opcional=this.ganadores.length+1
    
   })

  
  this.ganadorService.all().subscribe();
  this.SalaService.all().subscribe();
  }

  onSave(){
    this.sala.cantidad=0
    this.sala.premio=0
    if(this.sala.id==null){
       this.sala.id=this.opcional
    }

    if(this.sala.maximo!>0 && this.sala.valor!>0 && this.sala.fecha!=null){
      
    this.SalaService.create(this.sala).subscribe();
    }else{
      alert("Error al guardar")
    }
    
  }

  
 
}
