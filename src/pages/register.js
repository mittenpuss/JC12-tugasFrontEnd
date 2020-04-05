import React, { Component } from 'react';
import './css/pages.css'
import Bali2 from './image/bali2.png'
import {connect} from 'react-redux'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Fade from 'react-reveal/Fade';
import { Redirect } from 'react-router-dom';
import { API_URL } from '../support/ApiUrl';
import { message } from 'antd';
import Axios from 'axios'

class Register extends Component {
    state = { 
        data:[],
        username:'',
        email:'',
        password:'',
        passwordauth:'',
        isRegister:false,
        checked:true
     }


     handleChange = (event) => {
       this.setState({...this.state,checked:event.target.checked});
     };

    onChangeSignUp=(e)=>{
        this.setState({...this.state,[e.target.name]:e.target.value})
    }

    onClickShowPass=()=>{
        var x = document.getElementById("myInput");
        var y = document.getElementById("myInput2");
        
            if (x.type&&y.type === "password") {
                x.type = "text"
                y.type = "text"
            } else {
                x.type = "password"
                y.type = "password"

            }
    }

    onClickLogin=()=>{
        console.log(this.state)
        if(this.state.username==='' || this.state.email ==='' || this.state.password ==='' || this.state.passwordauth ===''){
            message.error('Mohon dilengkapi form yang ada.');
        }else{
            Axios.get(`${API_URL}/users?username=${this.state.username}`)
            .then((res)=>{
                if(res.data.length){
                    message.error('Username sudah digunakan, mohon menggunakan username yang lain.');
                }else{
                    Axios.get(`${API_URL}/users?email=${this.state.email}`)
                    .then((res)=>{
                        
                        if(res.data.length){
                            message.error('Email sudah digunakan, mohon menggunakan Email yang lain.');
                        }else if(!this.state.email.includes('@')){
                            message.error('Email kurang lengkap, mohon dilengkapi.');
                        }else{
                            if(this.state.password!==this.state.passwordauth){
                                message.error('Password tidak sama, mohon diulang');
                            }else{
                                message.success('Akun anda telah dibuat, silahkan login')
                                Axios.post(`${API_URL}/users`,{username:this.state.username,email:this.state.email,password:this.state.password,role:'user'})
                                .then((res)=>{   
                                    this.setState({isRegister:true})
                                }).catch((err)=>{
                                    console.log(err)
                                })
                                
                            }
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
            }).catch((err)=>{
                console.log(err)
            })
    
        }
    }



    render() { 

        if(this.props.User.isLogin){
            return <Redirect to='/'></Redirect>
        }

        if(this.state.isRegister){
            return <Redirect to='/login'></Redirect>
        }


        return ( 
            <div className='registerapp'>
                <div className='registercontainer'>
                    
                    <div className='registerform'>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md='10'>
                            <form>
                                <p className=" text-center ">Sign up</p>
                                
                                <div className='tesss'>
                                <TextField
                                
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                name="username"
                                autoFocus
                                onChange={this.onChangeSignUp}
                                />

                                <TextField
                                type='email'
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Email"
                                name="email"
                                autoFocus
                                onChange={this.onChangeSignUp}
                                />

                                <TextField
                                type='password'
                                variant="outlined"
                                margin="normal"
                                id='myInput'
                                required
                                fullWidth
                                label="Password"
                                name="password"
                                autoFocus
                                onChange={this.onChangeSignUp}
                                />

                                <TextField
                                type='password'
                                variant="outlined"
                                margin="normal"
                                id='myInput2'
                                required
                                fullWidth
                                label="Confirm Password"
                                name="passwordauth"
                                autoFocus
                                onChange={this.onChangeSignUp}
                                />
                                </div>
                        
                                <Form>
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input type="checkbox" onClick={this.onClickShowPass}/> Show Password
                                        </Label>
                                    </FormGroup>
                                </Form>

                                <div className="text-center mt-4">
                                
                                <MDBBtn color="indigo" onClick={this.onClickLogin}>Register</MDBBtn>
                                </div>
                            </form>
                           
                            </MDBCol>
                        </MDBRow>
                        </MDBContainer>
                        
                    </div>
                    
                    <div className='registerimage'>
                        <Fade>
                        <img src={Bali2} alt='gambar' height='50%' className='center'></img>
                        </Fade>
                        <div className='mt-5 bikinakun'>
                            <a className='text-dark' href="/login">I am already a member </a>
                        </div>
                    </div>

                </div>
            </div>
         );
    }
}

const mapStateToProps=(state)=>{
    return{
        User:state.Auth
    }
  }
  
  export default connect(mapStateToProps) (Register)