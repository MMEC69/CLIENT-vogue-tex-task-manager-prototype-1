import React from 'react';
import "./Dashboard.css";
import { Navbar } from "../../Components/Navbar/Navbar";
import { LeftMenu } from '../../Components/LeftMenu/LeftMenu';
import Content from '../../Components/Content/Content';

export default function Dashboard() {
  return (
    <div>
        <Navbar/>
        <LeftMenu/>
        <Content/>
    </div>
  )
}