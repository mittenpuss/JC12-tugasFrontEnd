import React,{useState,useEffect} from 'react';
import Axios from 'axios'
import {API_URL} from './support/ApiUrl'
import {KeepLogin} from './redux/actions'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import Profile from './pages/profile'
import Topic from './pages/topic'
import HeaderUser from './components/header-user'
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router-dom'


import './App.css';



function App(props) {

  const [Loading,setLoading]=useState(true)

    useEffect(()=>{
      FirstTime()
    })

  
  const FirstTime=()=>{
    var id=localStorage.getItem('iduser')
      if(id){
        Axios.get(`${API_URL}/users/${id}`)
        .then(res=>{
          props.KeepLogin(res.data)
        }).catch((err)=>{
          console.log(err)
        }).finally(()=>{
          setLoading(false)
        })
      }else{
        setLoading(false)
      }
  }

    if(Loading){
      return (
      <div>
        <h2 className='font-weight-bold text-center'>LOADING</h2>
      </div>
      )
    }


  return (
    <div>
      {
        props.User.isLogin?
        <HeaderUser/>
        :
        null
      }
      
      <Switch>
        <Route path='/login' exact component={Login}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/' exact component={Home}/>
        <Route path='/profile' exact component={Profile}/>
        <Route path='/topic/:id' exact component={Topic}/>
      </Switch>


    </div>
  );
}

const mapStateToProps=(state)=>{
  return{
      User:state.Auth
  }
}

export default connect(mapStateToProps,{KeepLogin}) (App)
