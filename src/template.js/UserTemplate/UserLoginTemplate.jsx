import { Route } from "react-router-dom";
import { Layout, Space } from 'antd';
const { Header, Footer, Sider, Content } = Layout;


export const UserLoginTemplate = (props) => { //props: path,exact , Component
    return <Route exact path={props.path} render={(propsRoute) => {
        return <>
            <Layout>
                <Sider width={window.innerWidth/2} style={{height:window.innerHeight,backGroundImage:'url("https://picsum.photos/2000")' ,backgroundSize:'100%'}}>

                </Sider>
                <Content style={{background:"linear-gradient(#141e30, #243b55)"}}>
                    <props.component {...propsRoute} />
                </Content>
            </Layout>


        </>
    }} />;
}