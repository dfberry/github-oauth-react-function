import "./App.css";
import AppRouter from "./AppRouter";
import {
  BrowserRouter as Router
} from "react-router-dom";
import useToken from './component/useToken';

function App() {

  const { token, setToken } = useToken();
  console.log(token)

  return (
    <div className="App">
      <Router>
        <AppRouter setToken={setToken}/>
      </Router>
    </div>
  );
}

export default App;
