export class Ganador{
    
    public id_user?: number
    public nombre?: string
    public fecha?: Date
    public id!:number
    public tipo!:string
    public numero?:number
    constructor(){}
    setValues(item:any){
        this.id_user=item.id_user
        this.nombre=item.nombre
        this.fecha=item.fecha
        this.id=item.id
        this.tipo=item.tipo
        this.numero=item.numero
    }
}
