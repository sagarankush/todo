import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateTaskForm, EditTaskForm, Login, Navbar, TaskCardFull, TaskList } from './components';
import { useState } from 'react';
import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import User from './models/User';
import Task from './models/Task';
// import Test from './components/Test';

function App() {

    const [user, setUser] = useState<User>();
    const [task, setTask] = useState<Task>();

    return (
        <>
            <BrowserRouter>
                <Layout
                    style={{
                        height: '100vh',
                    }}
                >
                    <Navbar user={user} />
                    <Content
                        style={{
                            height: '100%',
                            padding: '0 48px',
                        }}
                    >
                        <div
                            style={{
                                // background: colorBgContainer,
                                // minHeight: 280,
                                height: '100%',
                                padding: 24,
                                // borderRadius: borderRadiusLG,
                            }}
                        >
                            <Routes>
                                <Route path="/" element={<Login setUser={setUser} />} />
                                <Route path="/tasklist" element={<TaskList user={user} setTask={setTask} />} />
                                <Route path="/createtask" element={<CreateTaskForm user={user} />} />
                                <Route path="/edittask" element={<EditTaskForm user={user} task={task} />} />
                                <Route path="/taskview" element={<TaskCardFull task={task} setTask={setTask} />} />
                            </Routes>
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Todo App ©{new Date().getFullYear()} Created by Ankush
                    </Footer>
                </Layout>
            </BrowserRouter>
        </>
    )
}

export default App
