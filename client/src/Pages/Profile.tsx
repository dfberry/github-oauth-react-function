//import { useLocation } from "react-router-dom";
import User from "../component/user";
import { IUser } from "../utils/types";

type IProfileProps = {
  user: IUser;
};

const Profile: React.FC<IProfileProps> = ({user}) => {
  //const { state } = useLocation();

  //return <>{!!state ? <User user={user} /> : <>No profile found.</>}</>;
  return <>{!!user?.name ? <User user={user} /> : <>No profile found.</>}</>;
};

export default Profile;
