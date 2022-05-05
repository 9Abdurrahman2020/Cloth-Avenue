import { faUserGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const MakeAdmin = () => {
    const [inputVal, setInputVal ] = useState<string>('')
    const handleOnBlur = (e:React.FocusEvent<HTMLInputElement>) =>{
        setInputVal(e.target.value)
    }
    const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        fetch(`http://localhost:5000/role/${inputVal}`)
      .then((res) => res.json())
      .then((data) => {
        if(data !== null){
            fetch(`http://localhost:5000/make-admin/${inputVal}`,{
                method: 'PUT'
            })
            .then( res=> res.json())
            .then( result =>{
                if(result.acknowledged){
                    toast('successfully make admin !')
                }
            })
        }else{
            toast('This user not exist. Please input a valid user email !')
        }
      });
    }
    return (
        <div>
            <form onSubmit={handleFormSubmit} className="w-50 mx-auto my-5">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faUserGear}/></span>
                    <input onBlur={handleOnBlur} type="email" className="form-control" name="email" placeholder="Enter user email" aria-label="email" aria-describedby="basic-addon1" required/>
                </div>
                <input className='btn btn-success login-button' type="submit" value="Make Admin" />
                
            </form>
        </div>
    );
};

export default MakeAdmin;