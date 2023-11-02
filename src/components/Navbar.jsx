import React from 'react'
import { Nav, NavContainer, VerticalLine } from './NavbarElement'
import Logo from '../assets/images/logo.png'
import UserImg from '../assets/images/user.png'

const Navbar = () => {
  return (
    <Nav>
      <NavContainer>
        <div style={{display:'flex', alignItems:'center'}}>
          <img src={Logo} alt='Oore Logo' style={{width:'96.17px', height:'25.1px'}} />
          <VerticalLine style={{marginLeft:'120px', marginRight:'40px'}} />
          <span style={{color:'#818181', fontWeight:'400', fontSize:'20px', lineHeight:'24.38px'}}>Ready to make Africa a better Place?</span>
        </div>
        <div style={{display:'flex', alignItems:'center'}}>
          <img src={UserImg} alt="User's name" style={{width:'43px', height:'43px',borderRadius:'50%', paddingRight:'20px'}} />
          <span style={{color:'#454545', fontSize:'18px'}}>Tony Benson</span>
        </div>
      </NavContainer>
    </Nav>
  )
}

export default Navbar