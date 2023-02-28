import React from 'react';
import { useSelector } from 'react-redux';

const Home = (props) => {
    const {userLogin} = useSelector(state => state.UserLoginJiraReducer)
    return (
        <div>
           
           <img src={userLogin.avatar} alt="" />
        </div>
    );
}

export default Home;
