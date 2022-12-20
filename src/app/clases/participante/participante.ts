export class Participante{
    
    public tipo!:string
    public id?:number
    public identificacion!:number
    public nombre!:string
    public correo!:string
    public sala!:number
    constructor(){}
    setValues(item:any){
        this.tipo=item.tipo
        this.id=item.id
        this.identificacion=item.identificacion
        this.nombre=item.nombre
        this.correo=item.correo
        this.sala=item.sala
        
    }
}