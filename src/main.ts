import * as readline from 'readline';
import { Devoir, Ens, Etudiant } from './t';

function delay(milliseconds: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, milliseconds);
    });
  }


async function readLine(prompt: string , hello : void): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise<string>(resolve => {
        rl.question(prompt, (answer: string) => {
            rl.close();
            hello
            console.log("answer", answer)
            resolve(answer);
        });
    });
}

let ListEtud : any[] =[]
let ListEns: any[] =[]

async function multipleInput() {
    const input1 = await readLine("1.s'inscrire | 2.Vous avez un compte" );
    if (input1=="1"){
        const nom = await readLine("nom:" );
        const prenom = await readLine("prenom:" );
        const role = await readLine("1.ens|2.etudiant" );
        if (role==="1"){
            const t: Ens = new Ens(0,nom,prenom);
            let adress= t.myMethod()
            ListEns.push({p:t,adress})
            console.log("votre adress :: {", adress , " } votre motdepasse")
            await delay(3000)
            console.clear();
        }else{
            const classS = await readLine("entre votre class" );
            const e: Etudiant = new Etudiant(0,nom,prenom,classS);
            let adress= e.myMethod()
            console.log("votre adresse" + adress)
            ListEtud.push({p:e,adress})
            console.log("votre adress :: {", adress , " } votre motdepasse")
            await delay(3000)
            console.clear();
        }
        multipleInput()
    }else {
        console.log("entre votre adresse et motdepass")
        const adress = await readLine("adresse : " );
        const concatenatedList = ListEtud.concat(ListEns);
        const foundUser = concatenatedList.find((user) => user.adress.email === adress);
        if (foundUser) {
            foundUser.p.dateDS()
            
          } else {
            console.log("User not found.");
          }
         
      
    }
    

}

multipleInput();