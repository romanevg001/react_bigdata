import { memo } from "react";

import { useAppSelector } from "../store";

export const UserCard = memo(() =>{
  const user = useAppSelector((state) => state.users.user);

  
  return (<div className="card">
        <p>
          #{user?.id} {user?.name} <i>({user?.username})</i>
        </p>
        <p>
          phone: {user?.phone}, email: {user?.email}
        </p>
      </div>
  );
});
