//Factory Decorator (role)
export class Devoir{
    _Id:number;
    @TestDate
    _datee:Date;
    _classe:string;
    _matiere : string 
    public constructor(  Id:number,date:Date,classe:string , matiere:string){
        this._Id=Id;
        this._datee=date;
        this._classe=classe;
        this._matiere=matiere;
    }
    public ToString():String{
        return "DEvOIR:" + this._matiere + "Date : " + this._datee
    }
 
}


function Role(role:string) {
    return (constructor: Function)=>{
        constructor.prototype.newProperty=`This is ${role}`;
    }    
}
let nextId = 1;
// Parameter decorator to auto-increment an ID
function AutoIncrementId(target: Object, key: any, index: number) {
    const originalConstructor = target;
    // const originalConstructorFunction = target[key];
    target = function (...args: any[]) {
      args[index] = nextId;
      nextId++;
      return target;
    };
  }
  


//Methode Decorator
let devoir : Devoir[] = [
    new Devoir(0,new Date(2023, 11, 4, 15, 30) , "MPSw", "typescript") , 
    new Devoir(2,new Date(2023, 11, 4, 15, 30) , "2MPSw" , "math ") , 
    new Devoir(3,new Date(2023, 11, 4, 15, 30) , "1LM", "JAvA" ) , 
    new Devoir(4,new Date(2023, 11, 4, 15, 30) , "1LM" , "codage") , 
    new Devoir(5,new Date(2023, 11, 4, 15, 30) , "1LM", "mobile") , 
    new Devoir(6,new Date(2023, 11, 4, 15, 30) , "1LM","cloud") , 
    ]
    function consulterDatedevoire(flex: number | string) {
        return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
            descriptor.value = function () {
                devoir.forEach(p => {
                    if (p._Id === flex || p._classe === flex) {
                        console.log(p.ToString());
                    }
                });
            };
            return descriptor;
        }
    }
    

function createac(role: string ){
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.value = function () {
            let myClassInstance = this as User;
            const p = "_@&-*";
            const index = Math.floor(Math.random() * p.length);
            const value = Math.floor(Math.random() * 100);
            const result = `${myClassInstance.nom}${p[index]}${myClassInstance.prenom}${value}@${role}.com`;
            return { email: result };
        };
        return descriptor;
    }
}



export class User {
    public constructor(  public id :number ,  public nom: string, public prenom: string) {} 

}

@Role('enseignant')
export class Ens extends User {
    public constructor( @AutoIncrementId  id : number , nom: string, prenom: string) {
        super( id , nom, prenom);
    }
    @createac("enseignant")
    public myMethod() { 
    }

    @consulterDatedevoire("1LM")
    public dateDS(){}
   
    
}
@Role('etudiant')
export class Etudiant extends User{
    public constructor(@AutoIncrementId   id : number , nom: string, prenom: string, private classe: string) {
        super(id , nom, prenom);
    }
    @createac("etudiant")
    public myMethod() { 
    }

    @consulterDatedevoire("1LM")
    public dateDS(){}
}
//property Decorator
function TestDate(target: Object, propertyKey: string){
    let value:Date;
    const descriptor: PropertyDescriptor={
        get(){
            return value;
        },
        set(newValue:Date){
            if(newValue<new Date() ){
                console.log("date invalid");  
            }
            value=newValue;
        }
    }
    Object.defineProperty(target,propertyKey,descriptor)
}