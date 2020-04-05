import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import {API_URL} from '../support/ApiUrl'
import TextField from '@material-ui/core/TextField';
import Axios from 'axios'
import { Form, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import {EditUsernameEmailUser,EditPasswordUser} from '../redux/actions'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Redirect } from 'react-router-dom';

const Profile = (props) => {
  
    const [modal, setModal] = useState(false);
    const MySwal = withReactContent(Swal)
    const toggle = () => setModal(!modal);
    const [data, setData] = useState({
        usernameInput:props.User.username,
        emailInput:props.User.email,
        currentPassword:props.User.password,
        currentPasswordInput:'',
        newPasswordInput:'',
        newPasswordAuth:''
    })

    
    // UPLOAD IMAGE
    const [selectedfile, setSelectedfile] = useState(null);
    
    const fileSelectedHandler = event => {
        setSelectedfile(event.target.files[0])
        console.log(event.target.files[0])
    }

    // const fileUploadHandler = () =>{
    //     console.log(selectedfile)
    //     var id=localStorage.getItem('iduser')
    //     Axios.put(`${API_URL}/users?id=${id}`,{profileimage:selectedfile})
    //     .then((res)=>{
    //         console.log(res.data)
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    // }

    const onClickShowPass=()=>{
        var x = document.getElementById("myInput");
        var y = document.getElementById("myInput2");
        var z = document.getElementById("myInput3");

            if (x.type&&y.type&&z.type === "password") {
                x.type = "text"
                y.type = "text"
                z.type = "text"
            } else {
                x.type = "password"
                y.type = "password"
                z.type = "password"
            }
    }

    const onChangeUserandEmail=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
        console.log(data)
    }

    const onChangePassword=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
        console.log(data)
    }

    const onCLickChangePassword=()=>{
        if(data.currentPasswordInput === '' || data.newPasswordInput === '' || data.newPasswordAuth === ''){//kalo ada input yang kosong
            MySwal.fire({
                title: 'Error!',
                text: 'Password Kosong! Data tidak terganti.',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }else{
            if(data.currentPassword===data.currentPasswordInput){
                if(data.newPasswordInput===data.newPasswordAuth){
                    var id=localStorage.getItem('iduser')
                    var roleUser=localStorage.getItem('role')
                    Axios.put(`${API_URL}/users/${id}`,{username:props.User.username,email:props.User.email,password:data.newPasswordInput,role:roleUser})
                    .then((res3)=>{
                        var usernewdata ={
                            username:props.User.username,
                            password:data.newPasswordInput,
                            email:props.User.email,
                            role:roleUser
                        }
                        MySwal.fire({
                            title: 'Success!',
                            text: 'Password telah diperbaharui',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        })
                        props.EditPasswordUser(usernewdata)
                    }).catch((err)=>{
                        console.log(err)
                    })
                }else{
                    MySwal.fire({
                        title: 'Error!',
                        text: 'Password tidak sama! Mohon diperbaiki.',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                        
                }
            }else{
                MySwal.fire({
                    title: 'Error!',
                    text: 'Password Salah! Data tidak terganti.',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            }
            toggle()        
        }
    }

    const onCLickChangeUserandEmail=()=>{
        if(data.usernameInput === '' || data.emailInput === ''){//kalo ada input yang kosong
            MySwal.fire({
                title: 'Error!',
                text: 'Username atau Password Kosong! Data tidak terganti.',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }else if (data.usernameInput===props.User.username && data.emailInput===props.User.email){
            MySwal.fire({
                title: 'Success!',
                text: 'Profil telah diperbaharui',
                icon: 'success',
                confirmButtonText: 'Cool'
            })
        }else{
            Axios.get(`${API_URL}/users?username=${data.usernameInput}`)
            .then((res)=>{
                if(res.data.length && data.usernameInput!==props.User.username){
                    MySwal.fire({
                        title: 'Error!',
                        text: 'Username sudah terdaftar, mohon gunakan username yang lain.',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    }) 
                }else{
                    Axios.get(`${API_URL}/users?email=${data.emailInput}`)
                    .then((res2)=>{
                        if(!data.emailInput.includes('@')){
                            MySwal.fire({
                                title: 'Error!',
                                text: 'Email kurang lengkap, mohon dilengkapi.',
                                icon: 'error',
                                confirmButtonText: 'Cool'
                            }) 
                        }else if(res2.data.length && data.emailInput!==props.User.email){
                            MySwal.fire({
                                title: 'Error!',
                                text: 'Email sudah terdaftar, mohon gunakan email yang lain.',
                                icon: 'error',
                                confirmButtonText: 'Cool'
                            }) 
                        }else{
                            var id=localStorage.getItem('iduser')
                            var roleUser=localStorage.getItem('role')
                            Axios.put(`${API_URL}/users/${id}`,{username:data.usernameInput,email:data.emailInput,password:props.User.password,role:roleUser})
                            .then((res3)=>{
                                var usernewdata ={
                                    username:data.usernameInput,
                                    password:data.passwordInput,
                                    email:data.emailInput,
                                    role:roleUser
                                }
                                props.EditUsernameEmailUser(usernewdata)
                                MySwal.fire({
                                    title: 'Success!',
                                    text: 'Profil telah ter-update',
                                    icon: 'success',
                                    confirmButtonText: 'Cool'
                                })
                            }).catch((err)=>{

                            })
                        }
                    })
                }
            })
        }
    }

    if(props.User.isLogin===false){
        return <Redirect to='/login'/>
    }

        return ( 
            <div className='profilemaster'>
  
                <h2 className="mt-5 pb-4 text-center">Your Profile</h2>

                <div className='d-flex row justify-content-center mt-5'>
                               
                    <div className='tesss'>
                        <label className="grey-text">
                            Username
                        </label>
                        
                        <Input
                        defaultValue={props.User.username}
                        variant="outlined"
                        margin="normal"
                        required
                        label="Username"
                        name="usernameInput"
                        autoFocus
                        onChange={onChangeUserandEmail}
                        />
                        
                        <label className="grey-text mt-3">
                            Email
                        </label>
                        <Input
                        type='email'
                        defaultValue={props.User.email}
                        variant="outlined"
                        margin="normal"
                        required
                        name="emailInput"
                        autoFocus
                        onChange={onChangeUserandEmail}
                        />

                        <label className="grey-text mt-3">
                            Profile Picture
                        </label>
                        <Input type="file" onChange={fileSelectedHandler}/>
                        <button className='mt-1'>Upload (Masih Uji Coba, Belum berfungsi)</button>

                        <div className=" d-flextext-center mt-4">
                            <MDBBtn color="indigo" onClick={onCLickChangeUserandEmail}>Save Changes</MDBBtn>
                            <MDBBtn color="indigo" onClick={toggle}>Change Password</MDBBtn>
                        </div>
                    </div>
            
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Change Password</ModalHeader>
                        <ModalBody>

                             <TextField
                                type='password'
                                variant="outlined"
                                margin="normal"
                                id='myInput'
                                required
                                label="Current Password"
                                name="currentPasswordInput"
                                autoFocus
                                onChange={onChangePassword}
                                />
                            <br/>

                            <TextField
                                type='password'
                                variant="outlined"
                                margin="normal"
                                id='myInput2'
                                required
                                label="New Password"
                                name="newPasswordInput"
                                autoFocus
                                onChange={onChangePassword}
                                /> &nbsp; &nbsp;

                                <TextField
                                type='password'
                                variant="outlined"
                                margin="normal"
                                id='myInput3'
                                required
                                label="Confirm New Password"
                                name="newPasswordAuth"
                                autoFocus
                                onChange={onChangePassword}
                                />

                            <Form>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input type="checkbox" onClick={onClickShowPass}/> Show Password
                                    </Label>
                                </FormGroup>
                            </Form>

                            </ModalBody>

                        <ModalFooter>
                            <Button color="success" onClick={onCLickChangePassword}>Change Password</Button>{' '}
                            <Button color="danger" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                </div>
            </div>
         );
    }

const mapStateToProps=(state)=>{
    return{
        User:state.Auth
    }
}
 
export default connect (mapStateToProps,{EditUsernameEmailUser,EditPasswordUser}) (Profile)