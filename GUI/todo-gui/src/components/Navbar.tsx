import { Header } from 'antd/es/layout/layout';
import React from 'react';
import User from '../models/User';

interface NavbarProps {
    user: User | undefined;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <span style={{ color: 'white', fontWeight: "bolder", fontSize: "20px" }}>
                {/* <div className="demo-logo" /> */}
                <a style={{ color: 'inherit', textDecoration: 'inherit' }} href='/'>TODO</a>
            </span>
            <span style={{ color: 'white', fontWeight: "bolder", fontSize: "20px" }}>{user?.firstName}</span>
        </Header>
    );
};

export default Navbar;