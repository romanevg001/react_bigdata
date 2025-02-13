import { useEffect, useState } from "react";
import { UserSortedType, usersSlice } from "./user.slice";
import { useAppSelector, useAppDispath } from "../../store";
import { Pagination } from "../../common-components/Pagination/Pagination";
import usersData from "../../data/users.json";
import { UserItem } from "./UserItem";


export default function UsersTable() {
    const dispatch = useAppDispath();
    useEffect(() => {
      dispatch(usersSlice.actions.setUsers(usersData.users));
    },[]);
    const [sortType, onSort] = useState<UserSortedType>({type:'asc', field:'name'});
    const sortedUsers = useAppSelector((state) =>  usersSlice.selectors.selectorUsers(state, sortType) ); 
    const [listSlice, setListSlice] = useState([]);


    
    return (
        <>
            <div  className="overflow-auto max-h-[80vh] border-b-1 border-t-1 border-indigo-500 ">
            <table className="w-full">
               <thead  className="sticky w-full top-0 bg-amber-50">
                 <tr key="h">
                 <th># <span onClick={() => onSort({type:'asc', field:'ind'})}>asc</span> <span onClick={() => onSort({type:'desc', field:'ind'})}>desc</span>
                      </th>
              
                   <th>
                     name <span onClick={() => onSort({type:'asc', field:'name'})}>asc</span> <span onClick={() => onSort({type:'desc', field:'name'})}>desc</span>
                   </th>
                   <th>
                   department <span onClick={() => onSort({type:'asc', field:'department'})}>asc</span> <span onClick={() => onSort({type:'desc', field:'department'})}>desc</span>
                   </th>
                   <th>position</th>
                   <th>email</th>
                   <th>
                     age <span onClick={() => onSort({type:'asc', field:'age'})}>asc</span> <span onClick={() => onSort({type:'desc', field:'age'})}>desc</span>
                   </th>
                 </tr>
               </thead>
               <tbody>
                 {listSlice?.map((inUser) =>
                     inUser && <UserItem key={inUser.id} user={inUser} />
                 )}
               </tbody>
             </table>
             </div>
            <Pagination  list={sortedUsers} setListSlice={setListSlice}></Pagination>
        </>
    );
}