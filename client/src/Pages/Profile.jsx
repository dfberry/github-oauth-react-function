import User from "../component/user";
import { useLocation } from 'react-router-dom';

function Profile() {

  const { state } = useLocation();
  console.log(`user component ${JSON.stringify(state)}`);

  return (
    <>
      <User user={state.user} />
    </>
  );
}

export default Profile;
