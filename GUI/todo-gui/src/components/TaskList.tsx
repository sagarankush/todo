import React, { useEffect, useState } from 'react';
import { Button, Flex, Typography } from 'antd';
import User from '../models/User';
import TaskCard from './TaskCard';
import Task from '../models/Task';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/TaskList.module.css';

interface TaskListProps {
    user: User | undefined;
    setTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
}

const { Title } = Typography;

const TaskList: React.FC<TaskListProps> = ({ user, setTask }) => {
    const history = useNavigate();
    const [taskList, setTaskList] = useState<Task[]>([]);

    useEffect(() => {
        fetchTaskList();
    }, []);

    const fetchTaskList = async () => {
        if (!user) {
            history('/');
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/rest/getbyuser/' + user.id);
            const data = await response.json();
            let parsedTaskList: Task[] = parseTaskList(data);
            setTaskList(parsedTaskList);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    function onClickDeleteTask(taskId: number | undefined): void {
        if (!taskId) {
            return;
        }
        fetch('http://localhost:8080/rest/deletetask/' + taskId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.ok) {
                history('/tasklist');
            }
        }).catch(error => {
            console.error('Error deleting task:', error);
        });
        fetchTaskList();
    }

    const parseTaskList = (data: any): Task[] => {
        return data.map((task: any) => ({
            id: task.id,
            userId: "need to add user id here",
            title: task.title,
            details: task.taskDetails,
            dueDate: task.dueDate
        }));
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <Title level={4}>Your Tasks</Title>
                <Button type="primary" onClick={() => history('/createtask')}>Create New Task</Button>
            </div>
            <Flex wrap='wrap' gap={"large"} style={{overflow: 'auto', height: '100%', padding: '20px'}}>
                {taskList.map((task) => (
                    <span key={task.id} className={styles['task-container-span']}>
                        <TaskCard key={task.id} task={task} setTask={setTask} onClickDeleteTask={onClickDeleteTask} />
                    </span>
                ))}
            </Flex>
        </div>
    );
};

export default TaskList;