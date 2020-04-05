import React, { Component } from 'react';
import YouTube from 'react-youtube';
import Axios from 'axios';
import {API_URL} from '../support/ApiUrl'

// https://youtu.be/Hu3sLiPIJ4E
// https://www.youtube.com/watch?v=Hu3sLiPIJ4E
    class Topic extends Component {
        state = {
            pertanyaan:1,
            topikPilihanUser:'',
            idVideo:'',
            dialog:''
        }
        
        componentDidMount(){
            let topikPilihan=localStorage.getItem('topikPilihanUser')
            this.setState({topikPilihanUser:topikPilihan})
            Axios.get(`${API_URL}/isicourse?id=${1}`)
            .then((res)=>{
                this.setState({idVideo:res.data[0].kodeVideo})
                this.setState({dialog:res.data[0].dialogsatu})
                console.log(this.state.dialog[2])
            }).catch((err)=>{
                console.log(err)
            })
        }

        // dialogShow=()=>{
        //     return this.state.dialog.map((val,index)=>{
        //         return (
        //             <div key={index}> 
        //                 <div>{val}</div>
        //             </div>
        //         )
        //     })
        // }


        videoOnReady(event) {
            // access to player in all event handlers via event.target
            event.target.pauseVideo();
          }
    
        render() {
    
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
            autoplay: 1,
            },
        };
        
          return (
          <div> 
            <div className='text-center mt-3'>
            <YouTube 
                videoId={this.state.idVideo} 
                opts={opts} 
                onReady={this.videoOnReady} 
                />;              
            </div>
            
            <div className='text-center mt-4'>
            <h4>Dialog</h4>
            
            {/* {this.dialogShow()} */}
            
            </div>
            </div>
        )} 

    }

export default Topic;