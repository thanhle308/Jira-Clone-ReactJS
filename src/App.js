import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router-dom';
import { HomeTemplate } from './template.js/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import { UserLoginTemplate } from './template.js/UserTemplate/UserLoginTemplate';
import Login from './pages/Login/Login';
import Loading from './components/Loading/Loading';
import { JiraTemplate } from './template.js/HomeTemplate/JiraTemplate';
import { JiraTemplate1 } from './template.js/HomeTemplate/JiraTemplate1';
import IndexJira from './pages/IndexJira/IndexJira';
import CreateProject from './pages/CreateProject/CreateProject';

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Switch>
        <HomeTemplate exact path='/' component={Home} />
        <UserLoginTemplate exact path="/login" component={Login} />
        <HomeTemplate exact path='/home' component={Home} />
        <JiraTemplate exact path='/jira' component={IndexJira} />
        <JiraTemplate exact path='/createproject' component={CreateProject} />
        <JiraTemplate1 exact path='/antd' component={JiraTemplate1} />
      </Switch>

    </Router>

  );
}

export default App;
