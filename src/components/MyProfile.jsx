import React from 'react'
import {   userProjectAPI } from '../services/allAPIs'

function MyProfile({user}) {
    console.log(user);
    return (
        <div >
            <div className="container text-center border shadow py-5 my-5 ">
                <h3>My Profile </h3>
                <label>
                    <input type="file" style={{ display: 'none' }} />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbkWrK6FhDuNa-QZwqJe71dE7xYVGV1ZVEb9usTCA5NRT8FlyheMHseMYYnXKLsKQoiBw&usqp=CAU" alt="" />
                </label>

                <div className="w-50 mb-3 " style={{marginLeft:'200px'}}>
                    <input type="text" style={{color:'black'}} placeholder={user.username}  className='form-control my-3' />
                    <input type="text" placeholder={user.github} className='form-control mb-3' />
                    <input type="text" placeholder={user.link} className='form-control mb-3' />
                </div>
            </div>
        </div>
    )
}

export default MyProfile