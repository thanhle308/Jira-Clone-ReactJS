import React from 'react';
import ContentMain from '../../components/MainJira/ContentMain';
import InfoMain from '../../components/MainJira/InfoMain';
import HeaderMain from '../../components/MainJira/HeaderMain';

const IndexJira = () => {
    return (
        <div className="main">
            <HeaderMain />
            <h3>Cyber Board</h3>
            <InfoMain />
            <ContentMain />
        </div>
    )


}

export default IndexJira;
