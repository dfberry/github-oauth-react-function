import { Link } from "react-router-dom";
import "../App.css"; 
function Navigation() {
    return (
      <div className="flex-parent-element">
        {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}

          <Link className="flex-child-element" to="/">Home</Link>
          <Link className="flex-child-element" to="/login">Login</Link>
          <Link className="flex-child-element" to="/profile">Profile</Link>

      </div>
    );
  }
  
  export default Navigation;