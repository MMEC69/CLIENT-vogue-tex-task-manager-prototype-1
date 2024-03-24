import React from 'react';
import "./Dashboard.css";
import { Navbar } from "../../Components/Navbar/Navbar";
import { LeftMenu } from '../../Components/LeftMenu/LeftMenu';
import Content from '../../Components/Content/Content';
import { UserContext } from '../../Context/UserContex';
import { useContext } from 'react';

export default function Dashboard() {
  return (
    
    <div className='dashboard'>
        <Navbar/>
        <LeftMenu/>
        <Content/>
    </div>
  )
}
