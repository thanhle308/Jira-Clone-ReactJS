import React, { useEffect } from 'react';
import ContentMain from '../../components/MainJira/ContentMain';
import InfoMain from '../../components/MainJira/InfoMain';
import HeaderMain from '../../components/MainJira/HeaderMain';
import { useSelector, useDispatch } from 'react-redux';
import { GET_PROJECT_DETAIL_SAGA } from '../../redux/types/Jirabugs/JirabugsType';

const IndexJira = (props) => {
    const {projectDetail} = useSelector(state => state.ProjectEditReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        const {projectId} = props.match.params;
        dispatch({
            type: GET_PROJECT_DETAIL_SAGA,
            projectId
        })
    },[])

    return (
        <div className="main">
            <HeaderMain />
            <h3 className='text-info'>{projectDetail.projectName}</h3>
            <InfoMain projectDetail={projectDetail} />
            <ContentMain  projectDetail={projectDetail}/>
        </div>
    )


}

export default IndexJira;
