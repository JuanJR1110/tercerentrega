import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Ganador } from '../clases/ganador/ganador';
import { GanadorService } from '../servicios/ganador/ganador.service';

@Component({
  selector: 'app-ganadores',
  templateUrl: './ganadores.component.html',
  styleUrls: ['./ganadores.component.sass']
})
export class GanadoresComponent implements OnInit {
 
  participanteSubcription:Subscription=new Subscription
  public ganador= new Ganador()
  public ganadores:Ganador[] =[]
  public g!:string
  constructor(
   public ganadorService:GanadorService
  ) { }

  ngOnInit(): void {

    this.ganadorService.all$().subscribe((items:Ganador[])=>{
      this.ganadores=items
   
     })
  
    
  this.ganadorService.all().subscribe();
  }

}
