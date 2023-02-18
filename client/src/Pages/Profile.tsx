import { useLocation } from "react-router-dom";
import User from "../component/user";

const Profile: React.FC = () => {
  const { state } = useLocation();

  return (
    <>
      {!!state ? <User user={state.user} /> : <>No profile found.</>}
    </>
  );
};

export default Profile;
