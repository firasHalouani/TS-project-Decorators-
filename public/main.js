"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const t_1 = require("./t");
function delay(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
}
function readLine(prompt, hello) {
    return __awaiter(this, void 0, void 0, function* () {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return new Promise(resolve => {
            rl.question(prompt, (answer) => {
                rl.close();
                hello;
                console.log("answer", answer);
                resolve(answer);
            });
        });
    });
}
let ListEtud = [];
let ListEns = [];
function multipleInput() {
    return __awaiter(this, void 0, void 0, function* () {
        const input1 = yield readLine("1.s'inscrire | 2.Vous avez un compte");
        if (input1 == "1") {
            const nom = yield readLine("nom:");
            const prenom = yield readLine("prenom:");
            const role = yield readLine("1.ens|2.etudiant");
            if (role === "1") {
                const t = new t_1.Ens(0, nom, prenom);
                let adress = t.myMethod();
                ListEns.push({ p: t, adress });
                console.log("votre adress :: {", adress, " } votre motdepasse");
                yield delay(3000);
                console.clear();
            }
            else {
                const classS = yield readLine("entre votre class");
                const e = new t_1.Etudiant(0, nom, prenom, classS);
                let adress = e.myMethod();
                console.log("votre adresse" + adress);
                ListEtud.push({ p: e, adress });
                console.log("votre adress :: {", adress, " } votre motdepasse");
                yield delay(3000);
                console.clear();
            }
            multipleInput();
        }
        else {
            console.log("entre votre adresse et motdepass");
            const adress = yield readLine("adresse : ");
            const concatenatedList = ListEtud.concat(ListEns);
            const foundUser = concatenatedList.find((user) => user.adress.email === adress);
            if (foundUser) {
                foundUser.p.dateDS();
            }
            else {
                console.log("User not found.");
            }
        }
    });
}
multipleInput();
