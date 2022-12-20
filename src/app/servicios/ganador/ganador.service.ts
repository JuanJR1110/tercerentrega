import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map,catchError } from 'rxjs/operators';
import { Ganador } from 'src/app/clases/ganador/ganador';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GanadorService {
  public ganadores$ =new Subject<Ganador[]>;
  public ganador$ =new Subject<Ganador>();
  public ganador =new Ganador();
  public ganadores:Ganador[]=[];

  httpOptions={
    header:new HttpHeaders({'Content-Type':'application/json'})
  }

  public url=environment.url
  constructor(
    private http:HttpClient,
    private route: Router
  ) { }

  all$():Observable<Ganador[]>{
    return this.ganadores$.asObservable();
  }

  all():Observable<any>{
    this.ganadores=[]
    return this.http.get<Ganador>(this.url+"ganadores")
    .pipe(
      map((res:any)=>{
        res.forEach((item:any) => {
          this.ganador=new Ganador()
          console.log(this.ganador)
          this.ganador.setValues(item)
          this.ganadores.push(this.ganador)
        });
        this.ganadores$.next(this.ganadores)
      }),
      catchError((err)=>of(err))
     )
    
  }

  create(ganador:Ganador):Observable<any>{
    return this.http.post<Ganador>(this.url+"ganadores",ganador)
    .pipe(
      map((res:any)=>{
          this.ganador=new Ganador()
          this.ganador.setValues(res)
          this.ganador$.next(this.ganador)
        
      }),
      catchError((err)=>of(err))
     )
    
  }

}
