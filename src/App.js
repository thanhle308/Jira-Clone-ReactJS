import './App.css';
import { createBrowserHistory } from 'history';
import { Router, Switch } from 'react-router-dom';
import { UserLoginTemplate } from './template.js/UserTemplate/UserLoginTemplate';
import Login from './pages/Login/Login';
import Loading from './components/Loading/Loading';
import { JiraTemplate } from './template.js/HomeTemplate/JiraTemplate';
import IndexJira from './pages/IndexJira/IndexJira';
import CreateProject from './pages/CreateProject/CreateProject';
import ProjectManagement from './pages/ProjectManagement/ProjectManagement';
import Modal from './components/HOC/Modal';

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Modal/>
      <Switch>
        <UserLoginTemplate exact path="/login" component={Login} />
        <JiraTemplate exact path='/jira' component={IndexJira} />
        <JiraTemplate exact path='/createproject' component={CreateProject} />
        <JiraTemplate exact path='/' component={ProjectManagement} />
      </Switch>

    </Router>

  );
}

export default App;
