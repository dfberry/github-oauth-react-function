import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import AppRouter from './AppRouter'
import { getAppConfig } from './utils/config'

function App() {
  const appConfiguration = getAppConfig()

  return (
    <div className="App">
      <Router>
        <AppRouter configuration={appConfiguration} />
      </Router>
    </div>
  )
}

export default App
