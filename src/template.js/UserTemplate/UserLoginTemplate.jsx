import { Route } from "react-router-dom";
import { Layout, Space } from 'antd';
import { useEffect, useState } from "react";
const { Header, Footer, Sider, Content } = Layout;

export const UserLoginTemplate = (props) => { //props: path,exact , Component
    const [{width,height},setSize] = useState({width:window.innerWidth,height:window.innerHeight})
    useEffect(() =>{
        window.onresize = () => {
            setSize({
                width:window.innerWidth,
                height:window.innerHeight
            })
        }
    },[])
    return <Route exact path={props.path} render={(propsRoute) => {
        return <>
            <Layout>
                <Sider width={width/2} style={{height:height,backgroundImage:'url("https://picsum.photos/2000")' ,backgroundSize:'100%'}}>

                </Sider>
                <Content style={{background:"linear-gradient(#141e30, #243b55)"}}>
                    <props.component {...propsRoute} />
                </Content>
            </Layout>


        </>
    }} />;
}