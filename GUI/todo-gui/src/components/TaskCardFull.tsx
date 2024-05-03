import React, { useEffect } from 'react';
import { Card } from 'antd';
import Task from '../models/Task';
import Meta from 'antd/es/card/Meta';
import { EditOutlined, DeleteFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import styles from '../styles/TaskCard.module.css';

interface TaskProps {
    task: Task | undefined,
    setTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
}

const TaskCardFull: React.FC<TaskProps> = ({ task, setTask }) => {
    const history = useNavigate();
    useEffect(() => {
        if (!task) {
            history('/tasklist');
        }
    }, [task]);

    const actions = [
        <DeleteFilled key="setting" onClick={() => onClickDeleteTask(task?.id)} />,
        <EditOutlined key="edit" onClick={onClickEditBtn} />
    ]

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
    }

    function onClickEditBtn(e: React.MouseEvent<HTMLDivElement>): void {
        e.stopPropagation();
        setTask(task);
        history('/edittask');
    }

    return (
        <Card
            className={styles['full-task-container']}
            style={{ height: "100%", paddingBottom: "10px" }}
            styles={{ body: { height: "100%" } }}
            actions={actions}
        >
            <Meta
                style={{ height: "100%" }}
                title={task?.title}
                description={task?.details}
            />
        </Card>
    );
};

export default TaskCardFull;