import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import loading from '../../assets/img/loading.gif';
const Loading = (props) => {
    const { isLoading } = useSelector(state => state.LoadingReducer);


    return (
        <Fragment>
            {isLoading ?  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99 }}>
                <img src={loading} alt="" />
            </div> : ''
            }
           
        </Fragment>

    );
}

export default Loading;
