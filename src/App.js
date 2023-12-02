import {HashRouter,Routes,Navigate,Route} from 'react-router-dom'
import './App.css';
import Home from './pages/home'

function App() {
  return (
      <HashRouter>
        <Routes>
          <Route path={"/"} element={<Navigate to="/home"/>}/>
          <Route path={"/home"} element={<Home/>}/>
        </Routes>
      </HashRouter>
  );
}

export default App;
