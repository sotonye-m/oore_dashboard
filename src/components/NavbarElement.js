import styled from "styled-components";

export const Nav = styled.nav`
    background: #fff;
    height: 106px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 10;
    box-shadow: 0 10px 10px -5px rgba(179, 179, 179, 0.16);
    @media screen and (max-width: 960px){
        background: #fff;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 10;
        box-shadow: 0;
    }
`
export const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 90px;
    z-index: 1;
    width:100%;
    margin-right:60px;
    margin-left: 60px;
     @media screen and (max-width: 960px){
        display: none;
    }
`
export const VerticalLine = styled.div`
  border-left: 3px solid #E8E8E8; /* Adjust the width and color as needed */
  height: 40%; /* Adjust the height as needed */
  margin: 0 10px; /* Adjust the margin to control the space between elements */
`