import { DoublyLinkedList } from "data-structure-typed";
import { IUser } from "./store/userslice";
import { UnionFind } from "./friendsGenerator";
const usersLength = 1000;
const randomWord = () =>{
    const alfl = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']; 
    const wordLength = Math.round(5 + Math.random() * (20 + 1 - 5));
    const word = [];
    for(let i=0; i< wordLength; i++) {
        word.push(alfl[Math.round(Math.random()*26)]);
    }
    return word.join('');
}

const randomFriends = () =>{
    const friends = new Set();
    const countOfFriends = Math.round(Math.random() * 5);
    for(let i=0; i< countOfFriends; i++) {
        friends.add(Math.round(Math.random() * usersLength));
    }
    return Array.from(friends);
}
export const userGenerator = () => {
    const friends = new UnionFind(usersLength);
   
    const arr = Array.from({length: usersLength},(_,i)=>({
            id: i,
            name: randomWord(),
            username: randomWord(),
            email: randomWord(),
            phone: randomWord(),
            website: randomWord(),
            friends: [],
            isFriend (userId: number) {
                return friends.find(this.id) === friends.find(userId);
            }
        }));

        for(let i=0; i < usersLength/3; i++) {
           const item = arr[Math.round(Math.random()*100)];
           const _friends = randomFriends();
           item.friends = _friends;
           _friends.forEach(fr => friends.union(fr, i));
        }
        
   
    friends.print();
    return arr;
};


export const userGeneratorLL = () => {
    return new DoublyLinkedList<IUser>(userGenerator());
}


// Создаем экземпляр Union-Find для 5 пользователей


// Объединяем пользователей, которые являются друзьями
/* uf.union(0, 1); // Alice и Bob друзья
uf.union(1, 2); // Bob и Charlie друзья
uf.union(3, 4); // David и Eve друзья
 */
// Проверяем, являются ли пользователи из одной группы

