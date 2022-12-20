import { Injectable } from '@angular/core';
import {Observable, of, Subject} from 'rxjs'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {map,catchError, switchMap} from 'rxjs/operators';
import { Participante } from 'src/app/clases/participante/participante';
import { Sala } from 'src/app/clases/sala/sala';
import { ActivatedRoute, Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class ParticipantesService {

  public participante= new Participante();
  public participante$ = new Subject<Participante>();
  public participantes$ = new Subject<Participante[]>;
  public participantes2$ = new Subject<Participante[]>;
  public participantes: Participante[]=[];
  public sala= new Sala();
  public sala$ = new Subject<Sala>();
  public salas: Sala[]=[];


  httpOptions={
    header:new HttpHeaders({'Content-Type':'application/json'})
  }

  public url=environment.url
  constructor(
    private http:HttpClient,
    private router:ActivatedRoute,
    private route: Router
  ) { }

  all$():Observable<Participante[]>{
    return this.participantes$.asObservable();
  }


  get$():Observable<Sala>{
    return this.sala$.asObservable();
  }

  eliminar$():Observable<Participante[]>{
    return this.participantes2$.asObservable();
  }

  all():Observable<any>{
    this.participantes=[]
    return this.http.get<Participante>(this.url+"participantes")
    .pipe(
      map((res:any)=>{
        res.forEach((item:any) => {
          this.participante=new Participante()
          this.participante.setValues(item)
          this.participantes.push(this.participante)
        });

        this.participantes$.next(this.participantes)
      }),
      catchError((err)=>of(err))
     )

  }



  get(id:number):Observable<any>{

    this.sala= new Sala
    this.participantes=[]
    return this.http.get<Sala>(this.url+"salas/"+id)
    .pipe(
      switchMap((res:any)=>{
          this.sala=new Sala()
          this.sala.setValues(res)

          return this.http.get<Participante>(this.url+"participantes")
          .pipe(
            map((res:any)=>{
              res.forEach((item2:any) => {
                if(this.sala.id==item2.sala){
                  this.participante= new Participante()
                  this.participante.setValues(item2)
                  this.sala.participantes.push(this.participante)
                }
                this.sala$.next(this.sala)

              });
            }),
            catchError((err)=>of(err))
          )

      })

      )

  }

  eliminar(id:number):Observable<any>{

    this.participantes=[]
      return this.http.get(this.url+"participantes?sala="+id)
      .pipe(
        map((res:any)=>{
          res.forEach((item:any) => {
            this.participante=new Participante()
            this.participante.setValues(item)
            this.participantes.push(this.participante)
          });

          this.participantes2$.next(this.participantes)

        }),
        catchError((err)=>of(err))
       )
  }

  create(participante:Participante):Observable<any>{
    console.log(participante);

    return this.http.post<Participante>(this.url+"participantes",participante)
    .pipe(
      map((res:any)=>{
          this.participante=new Participante()
          this.participante.setValues(res)
          this.route.navigate(['/inicio']);

      }),
      catchError((err)=>of(err))
     )

  }

delete(id:number):Observable<any>{
  return this.http.delete(this.url+"participantes/"+id)
  .pipe(
    map((res:any)=>{
      this.route.navigate(['/inicio']);
    }),
    catchError((err)=>of(err))
   )


}

}
