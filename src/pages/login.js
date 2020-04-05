import React, { Component } from 'react';
import {connect} from 'react-redux'
import './css/pages.css'
import {LoginUser} from '../redux/actions'
import Bali from './image/bali.png'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import { FaFacebookSquare,FaTwitterSquare,FaInstagram } from 'react-icons/fa';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import Axios from 'axios'
import { API_URL } from '../support/ApiUrl';
import { message } from 'antd';

class Login extends Component {
    state = { 
        dataAxios:'',
        emailAxios:'',
        emailorusernameInput:'',
        passwordInput:''
     }
    

    onChangeLogin=(e)=>{
        this.setState({...this.state,[e.target.name]:e.target.value})
        // console.log(this.state)
    }

    onClickShowPass=()=>{
        var x = document.getElementById("myInput");
        
            if (x.type === "password") {
                x.type = "text"
            } else {
                x.type = "password"
            }
    }


    onClickLogin=()=>{
        console.log(this.state.emailorusernameInput)
        if(this.state.emailorusernameInput.includes('@')){
            Axios.get(`${API_URL}/users?email=${this.state.emailorusernameInput}&password=${this.state.passwordInput}`)
            .then((res)=>{
            this.setState({dataAxios:res.data})
            console.log(res.data)
            if(this.state.emailorusernameInput==='' || this.state.passwordInput ===''){
                message.error('Email atau password masih kosong, mohon dilengkapi.');
            }else if(!this.state.dataAxios.length){
                message.error('Email atau password salah.');
            }else{
                this.props.LoginUser(res.data)
                localStorage.setItem('iduser',res.data[0].id)
                localStorage.setItem('role',res.data[0].role)
                message.success('Anda berhasil login, redirect ke home.')
                
            }
        }).catch((err)=>{
            console.log(err)
        })

        }else{
            Axios.get(`${API_URL}/users?username=${this.state.emailorusernameInput}&password=${this.state.passwordInput}`)
        .then((res)=>{
            this.setState({dataAxios:res.data})
            console.log(res.data)
            if(this.state.emailorusernameInput==='' || this.state.passwordInput ===''){
                message.error('Email atau password masih kosong, mohon dilengkapi.');
            }else if(!this.state.dataAxios.length){
                message.error('Email atau password salah.');
            }else{
                this.props.LoginUser(res.data)
                localStorage.setItem('iduser',res.data[0].id)
                localStorage.setItem('role',res.data[0].role)
                localStorage.setItem('username',res.data[0].username)

                message.success('Anda berhasil login, redirect ke home.')
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

        return ( 

            <div className='loginapp'>
                <div className='logincontainer'>
                    <div className='loginimage'>
                        <Fade>
                        <img src={Bali} alt='gambar' height='50%' className='center'></img>
                        </Fade>
                        <div className='mt-5 bikinakun'>
                            <a className='text-dark' href="/register">Create an Account</a>
                        </div>
                    </div>
                    
                    <div className='loginform'>
                    <div>
                        
                    </div>
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md='10'>
                            <form>
                                <p className=" text-center mb-4 mt-3">Sign in</p>
                                
                                <label className="grey-text">
                                    Your email or username
                                </label>
                                <input type="text" className="form-control" value={this.state.emailorusernameInput} name='emailorusernameInput' onChange={this.onChangeLogin}/>
                                <br />

                            
                                <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                                    Your password
                                </label>
                                <input type="password" id='myInput' value={this.state.passwordInput} className="form-control" name='passwordInput' onChange={this.onChangeLogin}/>
                                <Form>
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input type="checkbox" onClick={this.onClickShowPass}/> Show Password
                                        </Label>
                                    </FormGroup>
                                </Form>
                                <div className="text-center mt-4">                
                
                                <MDBBtn color="indigo" onClick={this.onClickLogin}>Login</MDBBtn>
                                </div>

                            </form>

                            

                            <p style={{fontSize:'15px', fontFamily:"Arial", fontWeight:1, marginTop:'20px'}}>
                                Our Social Media: &nbsp;
                                <a href='https:twitter.com/anggaawijaya' target="_blank" rel='noopener noreferrer'> <FaTwitterSquare size='2em' color='#1c9dec'/> &nbsp; </a>
                                <a href='https:instagram.com/anggaawijaya' target="_blank" rel='noopener noreferrer'> <FaInstagram className='instagram'/> &nbsp; </a>
                                <a href='https:facebook.com/anggaawijaya90' target="_blank" rel='noopener noreferrer'> <FaFacebookSquare size='2em' color='#395795'/> &nbsp; </a>
                                
                                </p>

                           
                           
                            </MDBCol>
                        </MDBRow>
                        </MDBContainer>
                        

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
  
  export default connect(mapStateToProps,{LoginUser}) (Login)