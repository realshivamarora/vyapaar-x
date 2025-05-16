import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMessage } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
    return (
        <Nav className="navbar shadow-sm" activeKey="/home">
            <Nav.Item>
                <Link to="/" className="nav-link">Dashboard</Link>
            </Nav.Item>
            <div className="vertical-divider" />
            <Nav.Item>
                <Link to="/sales" className="nav-link">Sales</Link>
            </Nav.Item>
            <div className="vertical-divider" />
            <Nav.Item>
                <Link to="/expenses" className="nav-link">Expenses</Link>
            </Nav.Item>
            <div className="vertical-divider" />
            <Nav.Item>
                <Link to="/customers" className="nav-link">Customers</Link>
            </Nav.Item>
            <div className="vertical-divider" />
            <Nav.Item>
                <Link to="/dealers" className="nav-link">Dealers</Link>
            </Nav.Item>
            <div className="vertical-divider" />
            <Nav.Item>
                <Link to="/stocks" className="nav-link">Stocks</Link>
            </Nav.Item>
            <div className="vertical-divider" />
            <Nav.Item>
                <Link to="/billing" className="nav-link">Billing</Link>
            </Nav.Item>
            <div className="ml-auto helpline-icons">
                For TroubleShoot:
                <a href="tel:+919815366293" className="icon-link">
                    <FontAwesomeIcon icon={faPhone} />
                </a>
                <a href="https://wa.me/919815366293" className="icon-link">
                    <FontAwesomeIcon icon={faMessage} />
                </a>
                <a href="mailto:shivam.arora.contact@gmail.com" className="icon-link">
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
            </div>
        </Nav>
    );
};

export default Navbar;
