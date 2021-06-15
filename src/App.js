import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Project from './component/project/Project';
import Login from './security/Login';
import SignUp from './security/SignUp.js'
import Resource from './component/resource/Resource'
import TopBar from './container/TopBar'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <TopBar/>
        <Switch>
          <Route path="/home" component={Login}/>
          <Route path="/project" component={Project}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/resource" component={Resource}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
