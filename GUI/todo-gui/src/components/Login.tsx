// login component
// accepts user and setUser as props
// takes input from user and sets it to user state
// one button to login which routes to tasklist page
// Path: src/components/Login.tsx
import { Button, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../models/User';

interface LoginProps {
    setUser: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
    const history = useNavigate();

    // TEMP ELEMENTS
    const [userList, setUserList] = useState<User[]>([]);
    const [selectedUserId, setselectedUserId] = useState<number>();
    const [firstLoad, setFirstLoad] = useState<boolean>(true);

    useEffect(() => {
        fetchUserList();
    }, []);

    const fetchUserList = async () => {
        try {
            const response = await fetch('http://localhost:8080/rest/getalluser');
            const data = await response.json();
            let parsedUserList: User[] = parseUserList(data);
            setUserList(parsedUserList);          
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const parseUserList = (data: any): User[] => {
        return data.map((user: any) => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.secondName,
            phone: user.phone,
            password: "randompassword",
            createdAt: "random creation date",
            updatedAt: "random update date",
            email: user.firstName + "@" + user.secondName + ".com",
        }));
    };

    const onClickLogin = () => {
        setFirstLoad(false);
        if (!selectedUserId && !userList) {
            return;
        } else {
            setUser(userList.find((user: User) => user.id === selectedUserId) as User);
            history(`/tasklist`);
        }
    }


    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                }}
            >
                <Select onChange={(value) => setselectedUserId(value)}>
                    {userList.map((user: any) => (
                        <Select.Option key={user.id} value={user.id}>
                            {user.firstName + " " + user.lastName}
                        </Select.Option>
                    ))}
                </Select>

                <Input
                    placeholder="Enter your name"
                    value={selectedUserId}
                // onChange={(e) => setUser(parseInt(e.target.value))}
                />
                {!selectedUserId && !firstLoad && (
                    <div style={{ color: 'red' }}>Please select a user</div>
                )}
                <Button
                    type="primary"
                    onClick={onClickLogin}
                >
                    Login
                </Button>
            </div>
        </div>
    );
};

export default Login;
