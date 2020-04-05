import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
} from 'reactstrap';
import {connect} from 'react-redux'
import {Logout} from '../redux/actions'
import {Redirect} from 'react-router-dom'
import Bali from '../pages/image/bali.png'
import './css/components.css'
import { Popover, Button } from 'antd';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PersonOutline from '@material-ui/icons/PersonOutline';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';


const HeaderUser = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search,setSearch] = useState({
    searchInput:''
  })
  const toggle = () => setIsOpen(!isOpen);

  
  //Onchange untuk Search Bar
  const onChangeSearch=(e)=>{
    setSearch({...search,[e.target.name]:e.target.value})
    console.log(search.searchInput)
  }

  //Untuk Logout
  const onClickLogout=()=>{
    localStorage.clear()
    props.Logout()
  }
  
    //Untuk Logout
    const onClickProfile=()=>{
      return <Redirect to='/profile'></Redirect>
    }

  //Untuk Search
  const onSubmitSearch=()=>{
  props.searchItem(search)
  }

  return (
    <div className='headermaster'>
      <Navbar expand="md" style={{backgroundColor: 'white', boxShadow:'none', borderBottom:'2px #e5e5e5 solid',paddingLeft:'50px'}}>
                <NavbarBrand href="/">
                <img style={{marginLeft:'55px'}} fixed='top' src={Bali} alt='logo' height='40px'></img>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />     

        <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto ml-5" navbar>
            </Nav>

          {/* LOGIN LOGOUT */}
          <Nav>

              {/* <NavItem>
                    <Button type='link'>
                      <FaRegGem></FaRegGem>                    
                    </Button>
                  
              </NavItem>   */}

              <Popover align='center' placement="bottom" title={'Points Earned: 0'} content={`Jumlah poin yang berhasil dikumpulkan`} trigger="hover">
              <IconButton aria-label="show 17 new notifications" color="inherit">
                     <CardGiftcardIcon style={{fontSize:'1.2em'}}/>
              </IconButton>
              </Popover> &nbsp; &nbsp;
              
              <Popover align='center' placement="bottom" title={'Word Count'} content={`Jumlah kata yang telah berhasil dijawab dan dipelajari.`} trigger="hover">
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <LibraryBooksIcon/>
                </Badge>
              </IconButton>
              </Popover> 
              
              {/* <NavItem>
                  <NavLink disabled className='mr-3 text-dark' href="/profile">Welcome, {props.User.username}</NavLink>
              </NavItem> */}
          
          <UncontrolledDropdown>
              <DropdownToggle nav style={{marginRight:'55px'}}>
              <IconButton color="dark">
                <PersonOutline style={{fontSize:'1.3em'}}/>
              </IconButton>
                
                {/* <GoGear size='1.8em' color='black'/> */}
            
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <a href='/profile'>
                  Profile
                  </a>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={onClickLogout}>
                  <a href='/login'>
                  Logout
                  </a>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            </Nav>

        </Collapse>
      </Navbar>
      </div>

  );
}

const MapstatetoProps=(state)=>{
    return{
        User:state.Auth,
        Header:state.Header
    }
}
 

export default connect(MapstatetoProps,{Logout}) (HeaderUser);