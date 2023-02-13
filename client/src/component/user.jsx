import { ObjectAsList } from "./object-as-list";

import "../App.css";
function User({ user }) {
  console.log(`user ${JSON.stringify(user)}`);
  return (
    <>
      {user && Object.keys(user).length > 0 && (
        <ObjectAsList object={user} className={"ul-left"} sortAbc={true} />
      )}
    </>
  );
}

export default User;
