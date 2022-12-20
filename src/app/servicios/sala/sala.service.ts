import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map,catchError, switchMap} from 'rxjs/operators';
import { Sala } from 'src/app/clases/sala/sala';
import { Participante } from 'src/app/clases/participante/participante';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SalaService {
  public sala$ = new Subject<Sala>();
  public salas$ = new Subject<Sala[]>;
  public participantes$ = new Subject<Participante[]>;
  public sala= new Sala();
  public participante= new Participante();
  public salas: Sala[]=[];
  public participantes: Participante[]=[];

  public url=environment.url
  httpOptions={
    header:new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(
    private http:HttpClient,
    private route: Router
  ) { }

  all$():Observable<Sala[]>{
    return this.salas$.asObservable();
  }


  get$():Observable<Sala>{
    return this.sala$.asObservable();
  }


  create(sala:Sala):Observable<any>{
    return this.http.post<Sala>(this.url+"salas",sala)
    .pipe(
      map((res:any)=>{
          this.sala=new Sala()
          this.sala.setValues(res)
          this.sala$.next(this.sala)
          this.route.navigate(['/inicio']);

      }),
      catchError((err)=>of(err))
     )

  }

  all():Observable<any>{
    this.salas=[]
    return this.http.get<Sala>(this.url+"salas")
    .pipe(
      map((res:any)=>{
        res.forEach((item:any) => {
          this.sala=new Sala()
          this.sala.setValues(item)
          this.salas.push(this.sala)
        });
        this.salas$.next(this.salas)
      }),
      catchError((err)=>of(err))
     )

  }

  get(id:number):Observable<any>{
    this.sala= new Sala
    return this.http.get<Sala>(this.url+"salas/"+id)
    .pipe(
      map((res:any)=>{
          this.sala=new Sala()
          this.sala.setValues(res)
        this.sala$.next(this.sala)
      }),
      catchError((err)=>of(err))
     )

  }

  update(sala:Sala):Observable<any>{
    return this.http.put<Sala>(this.url+"salas/"+sala.id,sala)
    .pipe(
      map((res:any)=>{
       if(res.status=200){
          this.sala=new Sala()
          this.sala.setValues(res)
          this.sala$.next(this.sala)
          this.route.navigate(['/inicio']);
        }
      }),
      catchError((err)=>of(err))
     )

  }

  delete(id:number):Observable<any>{
    return this.http.delete(this.url+"salas/"+id)
    .pipe(
      map((res:any)=>{
        alert("Sorteo "+id+" eliminado con exito")
        this.route.navigate(['/inicio']);
      }),
      catchError((err)=>of(err))
     )

  }


}
