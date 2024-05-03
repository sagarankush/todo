import { Button, Form, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import User from '../models/User';
import { useNavigate } from 'react-router-dom';

interface CreateTaskFormProps {
    user: User | undefined;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ user }) => {
    const history = useNavigate();
    useEffect(() => {
        if (!user) {
            history('/');
        }
    }, [user]);

    const [task, setTask] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postTask(JSON.stringify(task));
        history('/tasklist');
    };

    const postTask = async (payload: any) => {
        if (!user) {
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/rest/savetaskbyuser/' + user.id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: payload,
            });
            await response.json();
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const onChangeTaskDetails = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTask(e.target.value);
    }

    return (
        <>
            <Typography.Title level={2}>Create Task</Typography.Title>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
            >
                <Form.Item>
                    <TextArea onChange={onChangeTaskDetails} style={{ maxWidth: "80vw" }} rows={20} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default CreateTaskForm;