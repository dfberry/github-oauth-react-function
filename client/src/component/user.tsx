import '../App.css'
import { ObjectAsList } from './object-as-list'

type IUserProps = {
  user: Object
}

const User: React.FC<IUserProps> = ({ user }: IUserProps) => {
  return (
    <>
      {user && Object.keys(user).length > 0 && (
        <ObjectAsList object={user} className={'ul-left'} sortAbc={true} />
      )}
    </>
  )
}

export default User
