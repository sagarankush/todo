import React, { useEffect } from 'react';
import { Card } from 'antd';
import Task from '../models/Task';
import Meta from 'antd/es/card/Meta';
import { EditOutlined, AlertTwoTone, DeleteFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';

interface TaskProps {
    task: Task | undefined,
    setTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
    onClickDeleteTask: (taskId: number | undefined) => void;
}

const TaskCard: React.FC<TaskProps> = ({ task, setTask, onClickDeleteTask }) => {
    const history = useNavigate();
    useEffect(() => {
        if (!task) {
            history('/tasklist');
        }
    }, [task]);

    const actions = [
        <DeleteFilled key="setting" onClick={() => onClickDeleteTask(task?.id)} />,
        <EditOutlined key="edit" onClick={onClickEditBtn} />,
        <AlertTwoTone key="alert" />
    ]

    function onClickEditBtn(e: React.MouseEvent<HTMLDivElement>): void {
        e.stopPropagation();
        setTask(task);
        history('/edittask');
    }

    function onClickCard(e: React.MouseEvent<HTMLDivElement>): void {
        e.stopPropagation();
        setTask(task);
        history('/taskview');
    }

    return (
        <Card
            onClick={onClickCard}
            style={{ width: 300 }}
            actions={actions}
        >
            <Meta
                style={{ height: "100%" }}
                title={task?.title}
                description={task?.details.slice(0, 100) + '...'}
            />
        </Card>
    );
};

export default TaskCard;