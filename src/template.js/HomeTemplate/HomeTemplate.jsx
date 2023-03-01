import { Route } from "react-router-dom";


export const HomeTemplate = (props) => { //props: path,exact , Component
    return <Route exact path={props.path} render={(propsRoute) => {
        return <>
            <h1 className="bg-black h-10 text-white">Day la header</h1>
            <props.component {...propsRoute} />
            <footer className="bg-black h-10 text-white">
                day la footer
            </footer>
        </>
    }} />;
}
