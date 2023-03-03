import { Route } from "react-router-dom";
import { Fragment } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import '../../index.css';
import MenuJira from "../../components/MenuJira/MenuJira";
import ModalJira from "../../components/ModalJira/ModalJira";
import HeaderMain from "../../components/MainJira/HeaderMain";
import InfoMain from "../../components/MainJira/InfoMain";
import ContentMain from "../../components/MainJira/ContentMain";

export const JiraTemplate = (props) => { //props: path,exact , Component
    return <Route exact path={props.path} render={(propsRoute) => {
        return <>
            <div className="jira">
                <Sidebar />
                <MenuJira />
                <props.component {...propsRoute} />
                <ModalJira />
            </div>
        </>
    }} />;
}
