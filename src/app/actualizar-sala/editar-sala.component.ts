import { Component, OnInit } from '@angular/core';
import { SalaService } from '../servicios/sala/sala.service';
import { Sala } from '../clases/sala/sala';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-sala',
  templateUrl: './editar-sala.component.html',
  styleUrls: ['./editar-sala.component.sass']
})
export class EditarSalaComponent implements OnInit{

  salaSubcription:Subscription=new Subscription
  public sala=new Sala();
  public sala2=new Sala();
  public id!:number
  constructor( 
    public SalaService: SalaService,
    private router:ActivatedRoute)
   { }

  ngOnInit(): void {
    //extrae el id del link de la ruta
    this.id=Number(this.router.snapshot.paramMap.get('id')) 
    this.salaSubcription=this.SalaService.get$().subscribe((item:Sala)=>{
      this.sala=item
    }
    
  )
  this.SalaService.get(this.id).subscribe();
  }
  //funcion que actualiza
  Update(){
    //comprando que los inputs tenda datos
    if(this.sala.maximo!>0  && this.sala2.fecha!=null && this.sala.valor!>0){
      this.sala.fecha=this.sala2.fecha
       this.SalaService.update(this.sala).subscribe();
    }else{
      alert("Error al guardar")
    }
    
  }


}{

}
