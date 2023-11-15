"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Etudiant = exports.Ens = exports.User = exports.Devoir = void 0;
//Factory Decorator (role)
class Devoir {
    constructor(Id, date, classe, matiere) {
        this._Id = Id;
        this._datee = date;
        this._classe = classe;
        this._matiere = matiere;
    }
    ToString() {
        return "DEvOIR:" + this._matiere + "Date : " + this._datee;
    }
}
exports.Devoir = Devoir;
__decorate([
    TestDate
], Devoir.prototype, "_datee", void 0);
function Role(role) {
    return (constructor) => {
        constructor.prototype.newProperty = `This is ${role}`;
    };
}
let nextId = 1;
// Parameter decorator to auto-increment an ID
function AutoIncrementId(target, key, index) {
    const originalConstructor = target;
    // const originalConstructorFunction = target[key];
    target = function (...args) {
        args[index] = nextId;
        nextId++;
        return target;
    };
}
//Methode Decorator
let devoir = [
    new Devoir(0, new Date(2023, 11, 4, 15, 30), "MPSw", "typescript"),
    new Devoir(2, new Date(2023, 11, 4, 15, 30), "2MPSw", "math "),
    new Devoir(3, new Date(2023, 11, 4, 15, 30), "1LM", "JAvA"),
    new Devoir(4, new Date(2023, 11, 4, 15, 30), "1LM", "codage"),
    new Devoir(5, new Date(2023, 11, 4, 15, 30), "1LM", "mobile"),
    new Devoir(6, new Date(2023, 11, 4, 15, 30), "1LM", "cloud"),
];
function consulterDatedevoire(flex) {
    return function (target, propertyKey, descriptor) {
        descriptor.value = function () {
            devoir.forEach(p => {
                if (p._Id === flex || p._classe === flex) {
                    console.log(p.ToString());
                }
            });
        };
        return descriptor;
    };
}
function createac(role) {
    return function (target, propertyKey, descriptor) {
        descriptor.value = function () {
            let myClassInstance = this;
            const p = "_@&-*";
            const index = Math.floor(Math.random() * p.length);
            const value = Math.floor(Math.random() * 100);
            const result = `${myClassInstance.nom}${p[index]}${myClassInstance.prenom}${value}@${role}.com`;
            return { email: result };
        };
        return descriptor;
    };
}
class User {
    constructor(id, nom, prenom) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
    }
}
exports.User = User;
let Ens = class Ens extends User {
    constructor(id, nom, prenom) {
        super(id, nom, prenom);
    }
    myMethod() {
    }
    dateDS() { }
};
exports.Ens = Ens;
__decorate([
    createac("enseignant")
], Ens.prototype, "myMethod", null);
__decorate([
    consulterDatedevoire("1LM")
], Ens.prototype, "dateDS", null);
exports.Ens = Ens = __decorate([
    Role('enseignant'),
    __param(0, AutoIncrementId)
], Ens);
let Etudiant = class Etudiant extends User {
    constructor(id, nom, prenom, classe) {
        super(id, nom, prenom);
        this.classe = classe;
    }
    myMethod() {
    }
    dateDS() { }
};
exports.Etudiant = Etudiant;
__decorate([
    createac("etudiant")
], Etudiant.prototype, "myMethod", null);
__decorate([
    consulterDatedevoire("1LM")
], Etudiant.prototype, "dateDS", null);
exports.Etudiant = Etudiant = __decorate([
    Role('etudiant'),
    __param(0, AutoIncrementId)
], Etudiant);
//property Decorator
function TestDate(target, propertyKey) {
    let value;
    const descriptor = {
        get() {
            return value;
        },
        set(newValue) {
            if (newValue < new Date()) {
                console.log("date invalid");
            }
            value = newValue;
        }
    };
    Object.defineProperty(target, propertyKey, descriptor);
}
