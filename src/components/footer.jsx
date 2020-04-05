import React, {Component} from 'react';
import './css/component.css'

class Footer extends Component {
    state = {  }
    render() { 

        if(!this.props.User.isLogin){
            null
        }else{
            return ( 
           
                <div>
     
                     <div className='footer'>
                         <div>2020 © Bali Language Center Co.</div>
                     </div>
                 
                 </div>
              );
     
        }
    }
}
 
export default Footer;