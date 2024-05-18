import { Card, DatePicker, Flex, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import User from '../models/User';
import { useNavigate } from 'react-router-dom';
import Task from '../models/Task';
import Meta from 'antd/es/card/Meta';
import { SaveFilled } from '@ant-design/icons'
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';

interface CreateTaskFormProps {
    user: User | undefined;
    task: Task | undefined;
}

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const EditTaskForm: React.FC<CreateTaskFormProps> = ({ user, task }) => {
    const [taskTitle, setTaskTitle] = useState(task?.title);
    const [taskDueDate, setTaskDueDate] = useState<Date>(task?.dueDate ? new Date(task?.dueDate) : new Date());
    const [taskDetails, setTaskDetails] = useState(task?.details);
    const dateFormat = 'YYYY-MM-DD';

    const history = useNavigate();
    useEffect(() => {
        if (!user) {
            history('/');
        }
    }, [user]);

    useEffect(() => {
        setTaskTitle(task?.title);
        setTaskDetails(task?.details);
        setTaskDueDate(task?.dueDate ? new Date(task?.dueDate) : new Date());
    }, [task]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (task && user) {
            task.title = taskTitle!;
            task.details = taskDetails!;
            task.dueDate = new Date(taskDueDate.toISOString());   // convert the string to a Date object
            postTask(JSON.stringify(task));
        }
        history('/tasklist');
    };

    const postTask = async (payload: any) => {
        if (!user && !task) {
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/rest/savetask', {
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
        setTaskDetails(e.target.value);
    }

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value);
    }

    const onDateChange: DatePickerProps['onChange'] = (date) => {
        if (date) {
            setTaskDueDate(date.toDate());
        }
    };

    return (
        <>
            <Card
                style={{ height: "100%", paddingBottom: "10px" }}
                styles={{ body: { height: "100%" } }}
                actions={[
                    <SaveFilled key="edit" onClick={handleSubmit} />,
                ]}
            >
                <Meta
                    style={{ height: "100%" }}
                    title={
                        <>
                            <Flex justify='space-between'>
                                <span>
                                    Editing: {task?.title}
                                </span>
                                <span>
                                    Due Date:
                                    <DatePicker
                                        style={{ marginLeft: '10px' }}
                                        defaultValue={dayjs(taskDueDate.toISOString().split('T')[0], dateFormat)}
                                        minDate={dayjs(new Date().toISOString().split('T')[0], dateFormat)}
                                        onChange={onDateChange}
                                    />
                                </span>
                            </Flex>
                        </>
                    }
                    description={(
                        <Form
                            name="basic"
                            style={{ height: '100%', padding: "10px" }}
                            initialValues={{ remember: true }}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>

                                name="username"
                                initialValue={taskTitle}
                                rules={[{ required: true, message: 'Please give a title!' }]}
                            >
                                <Input style={{ border: 'none', backgroundColor: '#f0f6f5', borderRadius: 0 }} onChange={onChangeTitle} placeholder='Title' />
                            </Form.Item>

                            <Form.Item<FieldType>
                                name="password"
                                initialValue={taskDetails}
                                style={{ height: "100%", maxHeight: "65vh", overflow: "auto" }}
                            >
                                <Input.TextArea autoSize onChange={onChangeTaskDetails} placeholder='Enter Task Details' style={{ height: "100%", backgroundColor: '#f0f6f5', border: "20px black", borderRadius: 0 }} />
                            </Form.Item>
                        </Form>
                    )}
                />
            </Card>
        </>
    );
};

export default EditTaskForm;