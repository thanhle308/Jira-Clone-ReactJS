import { Route } from "react-router-dom";
import MenuJiraAntd from "../../components/MenuJiraAntd/MenuJiraAntd";
import Sidebar from "../../components/Sidebar/Sidebar";
import '../../index.css';

export const JiraTemplate1 = (props) => { //props: path,exact , Component
    return <Route exact path={props.path} render={(propsRoute) => {
        return <>
            <MenuJiraAntd />
        </>
    }} />;
}
