import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router-dom';
import { HomeTemplate } from './template.js/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import { UserLoginTemplate } from './template.js/UserTemplate/UserLoginTemplate';
import Login from './pages/Login/Login';
import Loading from './components/Loading/Loading';
import { JiraTemplate } from './template.js/HomeTemplate/JiraTemplate';
import IndexJira from './redux/sagas/Jirabugs/indexJira';

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
      </Switch>

    </Router>

  );
}

export default App;
