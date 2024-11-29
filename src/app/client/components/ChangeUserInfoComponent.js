import React, { useState } from 'react';
import { putUserData } from './UserApiCalls';

export const ChangeUserInfoComponent = ({ token, uData }) => {
    const [userData, setUserData] = useState(uData);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const updatedUserData = {
            ...userData,
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email")
        };
        setUserData(updatedUserData);
        await putUserData(token, userData.id, updatedUserData);
    };

    return (
        <div className='change-user-info'>
            <h2>Change User Info</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='firstName'>First Name</label>
                <input type='text' id='firstName' name='firstName' defaultValue={userData.firstName} />
                <label htmlFor='lastName'>Last Name</label>
                <input type='text' id='lastName' name='lastName' defaultValue={userData.lastName} />
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' defaultValue={userData.email} />
                <button type='submit'>Change User Info</button>
            </form>
        </div>
    );
};