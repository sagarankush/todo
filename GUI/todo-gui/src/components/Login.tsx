import { Button, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../models/User';
import { GET_ALL_USERS_URL } from '../utils/Constants';

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
            const response = await fetch(GET_ALL_USERS_URL);
            const data = await response.json();
            let parsedUserList: User[] = parseUserList(data);
            setUserList(parsedUserList);          
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const parseUserList = (data: any): User[] => {
        return data.map((user: any) => ({
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            password: "randompassword",
            createdAt: user.createdAt,
            modifiedAt: user.modifiedAt,
            email: user.email,
        }));
    };

    const onClickLogin = () => {
        setFirstLoad(false);
        if (!selectedUserId && !userList) {
            return;
        } else {
            setUser(userList.find((user: User) => user.userId === selectedUserId) as User);
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
                        <Select.Option key={user.userId} value={user.userId}>
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
