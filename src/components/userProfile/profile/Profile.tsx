import React from 'react';
import Login from '../login/Login';

const Profile = () => {
    const user = true;
    return (
        <>
        {
            user ? <div>
                <h3 className='text-center my-3'>Personal Information !</h3>
                <div>
                    <p className='text-center'><b>Name: </b>Abdur Rahman</p>
                    <p className='text-center'><b>Email: </b>rahman@gmail.com</p>
                    <p className='text-center'><b>Phone: </b>+8801648308424</p>
                </div>
            </div> : <Login/>
        }
        </>
    );
};

export default Profile;