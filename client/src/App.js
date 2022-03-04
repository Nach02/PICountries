import './App.css';
import {Route} from 'react-router-dom'
import Home from './Components/Home/home';
import Login from './Components/Login/Login';
import Form from './Components/Form/Form';
import Detalle from './Components/Detalle/Detalle';

function App() {
  return (
    <div>
      <Route exact path="/" component={Login}/>
      <Route exact path="/home" component={Home}/>
      <Route path="/home/country/:id" component={Detalle}/>
      <Route exact path="/home/form" component={Form}/>
    </div>
  );
}

export default App;
