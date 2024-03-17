import React from 'react';
import "./Content.css";
import SingleProjectView from '../SingleProjectView/SingleProjectView';
import { projects } from "../../TestData/Projects";

export default function Content() {
  return (
    // projects?.length > 0 ?
    <div className='content'>
        {
          projects.map((project => (
            <SingleProjectView project= {project}/>
          ))) 
        }
    </div>
    
  );
}
