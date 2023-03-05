import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Select, Slider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALL_PROJECT_SAGA } from '../../../redux/types/Jirabugs/JirabugsType';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../redux/types/Jirabugs/TaskType';
import { GET_ALL_PRIORITY_SAGA } from '../../../redux/types/Jirabugs/PriorityType';


const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}
const handleChange = (value) => {
    console.log(`Selected: ${value}`);
};
export default function FormCreateTask(props) {

    // lay du lieu tu redux
    const { arrProjects } = useSelector(state => state.ProjectJiraReducer);
    const {arrTaskTypes} = useSelector(state => state.TaskTypeReducer);
    const {arrPriority} = useSelector(state => state.PriorityReducer);
    const dispatch = useDispatch();
    console.log('arr',arrPriority);

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0,
    })

    const handleEditorChange = (content, editor) => {
        // setFieldValue('description', content)
    }
    const [size, setSize] = useState('middle');
    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    //hook 
    useEffect(() => {
        dispatch({type: GET_ALL_PROJECT_SAGA})
        dispatch({type:GET_ALL_TASK_TYPE_SAGA})
        dispatch({type:GET_ALL_PRIORITY_SAGA})
    },[])
    return (
        <div className='container'>
            <div className="form-group">
                <p>Project</p>
                <select name="projectId" className='form-control'>
                    {arrProjects.map((project, index) => {
                        return <option key={index} value={project.projectName}>
                            {project.projectName}
                        </option>
                    })}
                </select>
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-6">
                        <p>Priority</p>
                        <select name="priorityId" className='form-control'>
                        {arrPriority?.map((priority, index) => {
                                return <option key={index} value={priority.priorityId}>
                                    {priority.priority}
                                </option>
                            })}
                        </select>
                    </div>
                    <div className="col-6">
                        <p>Task Type</p>
                        <select name="typeId" className='form-control'>
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
                            defaultValue={['a10', 'c12']}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                            }}
                            options={options}
                        />
                        <div className="row mt-4">
                            <div className="col-12">
                                <p className='mt-2'>Original Estimate</p>
                                <input type='number' defaultValue='0' min='0' className='form-control' name='originalEstimate' />
                            </div>
                        </div>
                    </div>

                    <div className="col-6">
                        <p>Time Tracking</p>
                        <Slider
                            defaultValue={30}
                            value={timeTracking.timeTrackingSpent}
                            max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)}
                            tooltip={{
                                open: true,
                            }}
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
                                }} />
                            </div>
                            <div className="col-6">
                                <p className='mt-2'>Time Remaining</p>
                                <input type='number' defaultValue='0' min='0' className='form-control' name='timeTrackingRemaining' onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    })
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
                    onEditorChange={handleEditorChange}
                />
            </div>
        </div>
    )
}
