import React from 'react';
import useAuth from '../../../hook/useAuth';
import Login from '../login/Login';

const Profile = () => {
    const { user } = useAuth();
    return (
        <>
        {
            user ? <div>
                <h3 className='text-center my-3'>Personal Information !</h3>
                <div>
                    <p className='text-center'><b>Name: </b>{user.displayName}</p>
                    <p className='text-center'><b>Email: </b>{user.email}</p>
                    <p className='text-center'><b>Phone: </b>{user.phoneNumber}</p>
                </div>
            </div> : <Login/>
        }
        </>
    );
};

export default Profile;