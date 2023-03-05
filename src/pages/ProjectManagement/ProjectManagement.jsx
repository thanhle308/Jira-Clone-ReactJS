import React from 'react';
import { DeleteOutlined, EditOutlined, SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Tag, Avatar, Popover, AutoComplete } from 'antd';
import { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import parse from 'html-react-parser';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_USER_PROJECT, DELETE_PROJECT_SAGA, GET_LIST_PROJECT_SAGA, GET_USER_API, REMOVE_USER_PROJECT } from '../../redux/types/Jirabugs/JirabugsType';
import FormEditProject from '../../components/Forms/FormEditProject/FormEditProject';
import { message, Popconfirm } from 'antd';
import { NavLink } from 'react-router-dom';

const confirm = (e) => {
    message.success('Click on Yes');
};

const cancel = (e) => {
    message.error('Click on No');
};

const ProjectManagement = () => {

    const { projectList } = useSelector(state => state.ProjectJiraReducer)
    const { userSearch } = useSelector(state => state.UserLoginJiraReducer)

    const searchRef = useRef(null);
    // console.log({ userSearch })
    const dispatch = useDispatch();

    const [value, setValue] = useState("");

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            sorter: (item2, item1) => {
                return item2.id - item1.id;
            },
            sortDirections: ['descend']
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            width: '20%',
            render: (text,record,index) => {
                return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>
            },
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName?.trim().toLowerCase();
                let projectName2 = item2.projectName?.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1;
                }
                return 1;
            }
        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            width: '20%',
            sorter: (item2, item1) => {
                let categoryName1 = item1.categoryName?.trim().toLowerCase();
                let categoryName2 = item2.categoryName?.trim().toLowerCase();
                if (categoryName2 < categoryName1) {
                    return -1;
                }
                return 1;
            }
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color='green'>{record.creator?.name}</Tag>
            },
            sorter: (item2, item1) => {
                let creator1 = item1.creator?.name.trim().toLowerCase();
                let creator2 = item2.creator?.name.trim().toLowerCase();
                if (creator2 < creator1) {
                    return -1;
                }
                return 1;
            }

        },
        {
            title: 'Menbers',
            key: 'members',
            render: (text, record, index) => {
                return <div>
                    {record.members?.slice(0, 3).map((member, index) => {
                        return <Popover key={index} placement='top' title={'Members'} content={() => {
                            return <table className='table'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Avatar</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {record.members?.map((item, index) => {
                                        return <tr key={index}>
                                            <td>{item.userId}</td>
                                            <td>
                                                <img src={item.avatar} width='30' height='30' style={{ borderRadius: '50%' }} />
                                            </td>
                                            <td>{item.name}</td>
                                            <td>
                                                <button onClick={() => {
                                                    dispatch({
                                                        type: REMOVE_USER_PROJECT,
                                                        userProject: {
                                                            userId: item.userId,
                                                            projectId: record.id,
                                                        }
                                                    })
                                                }} className='btn btn-danger' style={{ borderRadius: '50%' }}>X</button>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        }}>
                            <Avatar className='mr-1' key={index} src={member.avatar} />
                        </Popover>
                    })}
                    {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}

                    <Popover placement='rightTop' title={'Add User'} content={() => {
                        return <AutoComplete
                            options={userSearch?.map((user, index) => {
                                return { label: user.name, value: user.userId.toString() }
                            })}

                            value={value}

                            onChange={(text) => {
                                setValue(text);
                            }}

                            onSelect={(valueSelect, option) => {
                                // set gia  tri hop thoai 
                                setValue(option.label);                               
                                //goi api
                                dispatch({
                                    type: ADD_USER_PROJECT,
                                    userProject: {
                                        'projectId': record.id,
                                        'userId': Number(valueSelect)
                                    }
                                })
                            }}

                            style={{ width: '100%' }}
                            onSearch={(value) => {
                                if(searchRef.current) {
                                    clearTimeout(searchRef.current);
                                }
                                searchRef.current = setTimeout(() => {
                                    dispatch({
                                        type: GET_USER_API,
                                        keyword: value
                                    })
                                },300)
                            }} />
                    }} trigger="click">
                        <Button style={{ borderRadius: '50%' }}>+</Button>
                    </Popover>
                </div>
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <Space key={index} size='middle'>
                    <button className='btn btn-primary mr-2' onClick={() => {
                        const action = {
                            type: 'OPEN_FORM_EDIT_PROJECT',
                            title:'Edit Project',
                            Component: <FormEditProject />,
                            // SubmitFunction:
                        }

                        //Dispatch len reducer cai form can load kieu nao
                        dispatch(action);

                        //Disatch du lieu dong hien tai can edit
                        const actionEdit = {
                            type: 'EDIT_PROJECT',
                            projectEditModal: record,
                        }
                        dispatch(actionEdit);
                    }}><EditOutlined /></button>

                    <Popconfirm
                        title="Delete Project ?"
                        onConfirm={() => {
                            console.log('id project la:', record.id);
                            dispatch({
                                type: DELETE_PROJECT_SAGA,
                                idProject: record.id,
                            })
                        }}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className='btn  btn-danger'><DeleteOutlined /></button>
                    </Popconfirm>




                </Space>
            )
        },
    ];


    useEffect(() => {
        dispatch({
            type: GET_LIST_PROJECT_SAGA
        })
    }, [])
    return (
        <div className='container'>
            <h1 className='mt-5 mb-4'>Project Management</h1>
            <Table rowKey={'id'} style={{ width: '100%' }} columns={columns} dataSource={projectList} />
        </div>
    );
}

export default ProjectManagement;
