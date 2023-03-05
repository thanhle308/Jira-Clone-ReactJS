import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const { Option } = Select;

const Modal = () => {
    const { visible, ComponentContentDrawer, callBackSubmit ,title } = useSelector(state => state.drawerReducer)
    const dispatch = useDispatch();
    console.log('visible', visible)
    const showDrawer = () => {
        dispatch({
            type: 'OPEN_DRAWER'
        })
    };
    const onClose = () => {
        dispatch({
            type: 'CLOSE_DRAWER'
        })
    };
    return (
        <>
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                open={visible}
                bodyStyle={{
                    paddingBottom: 80,
                }}
                footer={
                    <div style={{ textAlign: 'right' }}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={() => {
                             callBackSubmit();
                            onClose();
                        }} className="bg-primary text-white ml-2 m-2">
                            Submit
                        </Button>
                    </div>
                }
            >
                {ComponentContentDrawer}
            </Drawer>
        </>
    );
}

export default Modal;
