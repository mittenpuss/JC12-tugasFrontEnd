import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Bali from './image/bali.png'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {API_URL} from '../support/ApiUrl'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { Popover } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';



class Home extends Component {
    state = { 
        topic:[],
        pilihanTopik:""
     }

     chooseTopic=((topic_id)=>{
        this.setState({pilihanTopik:topic_id})
        console.log(this.state.pilihanTopik)
        localStorage.setItem('topikPilihanUser',this.state.pilihanTopik)
     })

     componentDidMount(){
         Axios.get(`${API_URL}/coursebali`)
         .then((res)=>{
             this.setState({topic:res.data})
         }).catch((err)=>{
             console.log(err)
         })
     }

     renderTopics=()=>{
        return this.state.topic.map((val,index)=>{
            return (
                <div className='looping ' key={index} style={{width:'200px', height:'150px', margin:'20px'}}>
                    <div>
                        <Link to={`/topic/${val.id}`}>
                            <img src={val.image} width='90%' height='100px' style={{marginLeft:'8px'}} onClick={()=> this.chooseTopic(val.id)}/>
                        </Link>                        
                    </div>
                    <div className='mt-2 text-center'>
                        {val.topic}
                    </div>
                </div>
            )
        })
    }


    render() { 

 
        if(this.props.User.isLogin===false){
            return <Redirect to='/login'/>
        }
                
        return ( 
    
        <div className='homemaster'>
            <div className='homecontainer'>
                <div className='home-isi'>
                    {this.renderTopics()}
                </div>
                <div className='home-profile'>
                    <h3 className='text-center mt-2'>Achievements</h3>
                    <div style={{marginLeft:'30px'}}>
                        <Popover  align='center' placement="bottom" title={`I'll Be Back`} content={`Menyelesaikan semua topik dengan nilai sempurna!`} trigger="hover">
                            <IconButton aria-label="show 17 new notifications" color="inherit">
                                <Badge badgeContent={0} color="secondary">
                                    <DoneAllIcon style={{fontSize:'2em'}}/>
                                </Badge>
                            </IconButton>
                         </Popover>
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

export default connect (mapStateToProps) (Home)