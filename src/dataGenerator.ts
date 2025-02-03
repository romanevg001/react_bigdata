import { DoublyLinkedList } from "data-structure-typed";
import { IUser } from "./store/userslice";

const randomWord = () =>{
    const alfl = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; 
    const wordLength = Math.round(5 + Math.random() * (20 + 1 - 5));
    const word = [];
    for(let i=0; i< wordLength; i++) {
        word.push(alfl[Math.round(Math.random()*26)]);
    }
    return word.join('');
}

export const userGenerator = () => Array.from({length: 100000},(_,i)=>({
    id: i,
    name: randomWord(),
    username: randomWord(),
    email: randomWord(),
    phone: randomWord(),
    website: randomWord(),
}));


export const userGeneratorLL = () => {
    return new DoublyLinkedList<IUser>(userGenerator());
}