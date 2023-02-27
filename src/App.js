import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router-dom';
import { HomeTemplate } from './template.js/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import { UserLoginTemplate } from './template.js/UserTemplate/UserLoginTemplate';
import Login from './pages/Login/Login';


export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <HomeTemplate exact path='/' component={Home} />
        <UserLoginTemplate exact path="/login" component={Login} />
      </Switch>
    </Router>

  );
}

export default App;
