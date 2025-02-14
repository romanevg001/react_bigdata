import { useEffect, useState } from "react";
import { UserSortedType, usersSlice } from "./user.slice";
import { useAppSelector, useAppDispath } from "../../store";
import { Pagination } from "../../common-components/Pagination/Pagination";
import usersData from "../../data/users.json";
import { UserItem } from "./UserItem";
import { TableUsersColumnsEnum, tableUsersSortedColumns } from "./table-fields.model";


export default function UsersTable() {
    const dispatch = useAppDispath();
    useEffect(() => {
      dispatch(usersSlice.actions.setUsers(usersData.users));
    },[]);
    const [sortType, onSort] = useState<UserSortedType>({type:'asc', field:'name'});
    const sortedUsers = useAppSelector((state) =>  usersSlice.selectors.selectorUsers(state, sortType) ); 
    const [listSlice, setListSlice] = useState([]);

console.log(Object.keys(TableUsersColumnsEnum))
console.log(Object.values(TableUsersColumnsEnum))
console.log(Object.entries(TableUsersColumnsEnum))
console.log(TableUsersColumnsEnum)
    
    return (
        <>
            <div  className="overflow-auto max-h-[80vh] border-b-1 border-t-1 border-indigo-500 ">
            <table className="w-full">
               <thead  className="sticky w-full top-0 bg-amber-50">
                 <tr className="capitalize">
                    {
                      Object.keys(TableUsersColumnsEnum).map((el)=>
                      <th key={el}>
                        {el}
                        {
                          tableUsersSortedColumns[el] && 
                          <>
                            <span 
                              onClick={() => onSort({type:'asc', field: el})} 
                              className={
                                "icon icon-arrow-up2 cursor-pointer pl-2 pr-1 hover:text-indigo-600 " + 
                                (sortType.field==el && sortType.type == 'asc' ? "text-indigo-600": '')
                              }
                            ></span>
                            <span 
                              onClick={() => onSort({type:'desc', field: el})}
                              className={
                                "icon icon-arrow-down2 cursor-pointer hover:text-indigo-600" + 
                                (sortType.field==el && sortType.type == 'asc' ? "text-indigo-600": '')
                              }
                            ></span>
                          </>
                        }
                      </th>)
                    }
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