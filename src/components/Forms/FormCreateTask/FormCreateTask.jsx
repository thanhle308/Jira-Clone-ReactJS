import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Select, Slider } from 'antd';
import { connect, useDispatch, useSelector } from 'react-redux';
import { GET_ALL_PROJECT_SAGA, GET_USER_API, GET_USER_BY_PROJECT, GET_USER_BY_PROJECT_SAGA } from '../../../redux/types/Jirabugs/JirabugsType';
import { CREATE_TASK_SAGA, GET_ALL_TASK_TYPE_SAGA } from '../../../redux/types/Jirabugs/TaskType';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/types/Jirabugs/PriorityType';

import { withFormik } from 'formik';
import * as Yup from 'yup';
import { GET_ALL_STATUS_SAGA } from '../../../redux/types/Jirabugs/StatusType';


// const options = [];
// for (let i = 10; i < 36; i++) {
//     options.push({
//         value: i.toString(36) + i,
//         label: i.toString(36) + i,
//     });
// }
const handleChange = (value) => {
    console.log(`Selected: ${value}`);
};
function FormCreateTask(props) {
    // lay du lieu tu redux
    const { arrProjects } = useSelector(state => state.ProjectJiraReducer);
    const { arrTaskTypes } = useSelector(state => state.TaskTypeReducer);
    const { arrPriority } = useSelector(state => state.PriorityReducer);
    const { arrUser } = useSelector(state => state.UserLoginJiraReducer);
    const { arrStatus } = useSelector(state => state.StatusReducer);


    const optionUserSearch = arrUser.map((item, index) => {
        return { value: item.userId, label: item.name }
    })
    const dispatch = useDispatch();
    // console.log('arr', arrUser);

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
    } = props; // cac prop sinh ra do formik => component
    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
    })
    const [size, setSize] = useState('middle');
    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    //hook 
    useEffect(() => {
        dispatch({ type: GET_ALL_PROJECT_SAGA })
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA })
        dispatch({ type: GET_ALL_PRIORITY_SAGA })
        dispatch({ type: GET_ALL_STATUS_SAGA })

        //Đưa hàm handle submit lên drawer reducer lên để cập nhật lại sưj kiện cho nút Submit
        dispatch({type:'SET_SUBMIT_CREATE_TASK',submitFunction :handleSubmit})
        dispatch({ type: GET_USER_API, keyword: '' })
    }, [])
    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className="form-group">
                <p>Project</p>
                <select name="projectId" className='form-control' onChange={(e) => {
                    console.log('validationSchema', e.target.value);
                    //dispatch gia tri lam thay doi arruser
                    let { value } = e.target;
                    dispatch({
                        type: GET_USER_BY_PROJECT_SAGA,
                        idProject: value
                    })
                    // cap nhat gia tri project id
                    setFieldValue('projectId', e.target.value);
                }}>
                    {arrProjects.map((project, index) => {
                        return <option key={index} value={project.id}>
                            {project.projectName}
                        </option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <p>Task Name</p>
                <input name='taskName' className='form-control' onChange={handleChange} />
            </div>
            <div className="form-group">
                <p>Status</p>
                <select name='statusId' className='form-control' onChange={handleChange} >
                    {arrStatus.map((status, index) => {
                        return <option key={index} value={status.statusId}>
                            {status.statusName}
                        </option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Priority</p>
                        <select name="priorityId" className='form-control' onChange={handleChange}>
                            {arrPriority?.map((priority, index) => {
                                return <option key={index} value={priority.priorityId}>
                                    {priority.priority}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className="col-6">
                        <p>Task Type</p>
                        <select name="typeId" className='form-control' onChange={handleChange}>
                            {arrTaskTypes?.map((taskType, index) => {
                                return <option key={index} value={taskType.id}>
                                    {taskType.taskType}
                                </option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Assignees</p>
                        <Select
                            mode="multiple"
                            size={size}
                            placeholder="Please select"
                            // defaultValue={['a10', 'c12']}
                            onChange={(values) => {
                                setFieldValue('listUserAsign', values)
                            }}
                            optionFilterProp='label'
                            onSearch={(value) => {

                            }}
                            style={{
                                width: '100%',
                            }}
                            options={optionUserSearch}
                        />
                        <div className="row mt-4">
                            <div className="col-12">
                                <p className='mt-2'>Original Estimate</p>
                                <input type='number' defaultValue='0' min='0' className='form-control' name='originalEstimate' onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <p>Time Tracking</p>
                        <Slider
                            defaultValue={30}
                            value={timeTracking.timeTrackingSpent}
                            max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)}
                        // tooltip={{
                        //     open: true,
                        // }}
                        />
                        <div className="row">
                            <div className="col-6 text-left font-weight-bold">{timeTracking.timeTrackingSpent}h logged</div>
                            <div className="col-6 text-right font-weight-bold">{timeTracking.timeTrackingRemaining}h remaining</div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <p className='mt-2'>Time spent</p>
                                <input type='number' defaultValue='0' min='0' className='form-control' name='timeTrackingSpent' onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingSpent: e.target.value
                                    })
                                    setFieldValue('timeTrackingSpent', e.target.value)
                                }} />
                            </div>
                            <div className="col-6">
                                <p className='mt-2'>Time Remaining</p>
                                <input type='number' defaultValue='0' min='0' className='form-control' name='timeTrackingRemaining' onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    })
                                    setFieldValue('timeTrackingRemaining', e.target.value)
                                }} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="form-group">
                <p>Description</p>
                <Editor
                    name='description'
                    initialValue=""
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={(content, editor) => {
                        setFieldValue('description', content)
                    }}
                />
            </div>
        </form>
    )
}

const createTaskForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { arrProjects, arrTaskTypes, arrPriority, arrStatus } = props;
        if (arrProjects.lengh > 0) {
            props.dispatch({ type: GET_USER_BY_PROJECT_SAGA, idProject: arrProjects[0]?.id })

        }
        return {
            taskName: "",
            description: "",
            statusId: arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: arrProjects[0]?.id,
            typeId: arrTaskTypes[0]?.id,
            priorityId: arrPriority[0]?.priorityId,
            listUserAsign: []
        }
    },
    validationSchema: Yup.object({

    }),
    handleSubmit: (values, { props, setSubmitting }) => {
        props.dispatch({
            type: CREATE_TASK_SAGA,
            TaskObject: values
        })
    },

    displayName: 'createTaskForm',
})(FormCreateTask);


const mapStateToProps = (state) => {
    return {
        arrProjects: state.ProjectJiraReducer.arrProjects,
        arrTaskTypes: state.TaskTypeReducer.arrTaskTypes,
        arrPriority: state.PriorityReducer.arrPriority,
        arrStatus: state.StatusReducer.arrStatus,
    }
}


export default connect(mapStateToProps)(createTaskForm);