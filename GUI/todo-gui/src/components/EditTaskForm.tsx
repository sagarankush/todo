import { Card, Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import User from '../models/User';
import { useNavigate } from 'react-router-dom';
import Task from '../models/Task';
import Meta from 'antd/es/card/Meta';
import { SaveFilled } from '@ant-design/icons'

interface CreateTaskFormProps {
    user: User | undefined;
    task: Task | undefined;
}

const EditTaskForm: React.FC<CreateTaskFormProps> = ({ user, task }) => {
    const history = useNavigate();
    useEffect(() => {
        if (!user) {
            history('/');
        }
    }, [user]);

    const [taskDetails, setTaskDetails] = useState(task?.details);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postTask(JSON.stringify(taskDetails));
        history('/tasklist');
    };

    const postTask = async (payload: any) => {
        if (!user && !task) {
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/rest/updatetask/' + task?.id, {
                method: 'PUT',
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

    return (
        <>
            <Card
                style={{ height: "100%", paddingBottom: "10px" }}
                styles={{ body: { height: "100%" } }}
                // style={fullView ? { height: "100%", paddingBottom: "10px" } : { width: 300 }}
                // styles={fullView ? { body: { height: "100%" } } : undefined}
                // bodyStyle={{ height: "100%" }}
                // styles.body={{height: "100%"}}
                actions={[
                    <SaveFilled key="edit" onClick={handleSubmit} />,
                ]}
            >
                <Meta
                    style={{ height: "100%" }}
                    title={"Editing Task: " + task?.title}
                    description={(
                        <Form
                            layout="horizontal"
                        >
                            <Form.Item>
                                <TextArea style={{ height: '100%' }} value={taskDetails} onChange={onChangeTaskDetails} />
                            </Form.Item>
                            {/* <Form.Item>
                                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                                    Save
                                </Button>
                            </Form.Item> */}
                        </Form>
                    )}
                // description={fullView ? task?.details : task?.details.slice(0, 100) + '...'}
                />
            </Card>
            {/* <Typography.Title level={2}>Create Task</Typography.Title>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
            >
                <Form.Item>
                    <TextArea value={taskDetails} onChange={onChangeTaskDetails} style={{ maxWidth: "80vw" }} rows={20} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                        Save
                    </Button>
                </Form.Item>
            </Form> */}
        </>
    );
};

export default EditTaskForm;