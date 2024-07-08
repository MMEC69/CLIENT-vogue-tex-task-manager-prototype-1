import React, { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContex'; 
import axios from 'axios';
import toast from 'react-hot-toast';
import Styles from "../ComponentCSS/Form.module.css";
import LayoutStyles from "../ComponentCSS/Layout.module.css";
import { Field1, Field2, DField1, MSField1, SubmitBtn1 } from '../UtilizeComponents/fC';
import {userRoleDividerCP, projectOwnerFilter, prevUserRoleDividerCP} from "../../Functions/Conversion";
import {projectStateForCP} from "../../Functions/ProjectStateFunctions";
import { projectName1, departmentName1, projectDescription1 } from "../../MetaData/FormValidationPatterns";
import { sendMailNewProject } from '../../Functions/Mail';
import { uploadAttachments, updateServerAttachments } from "../../Functions/ServerCommunication";
import {Charts} from "../../Components/Charts/ChartsForDashboard";
import SingleProjectView from '../SingleProjectView/SingleProjectView';


export function ProjectDashboardContent() {
    const {displayProjects} = useContext(UserContext);

    //post/put to server--------------------------------------------------Function
    
    return (
        <div className={LayoutStyles.projectDashboardContentLayout}>
            <div className={LayoutStyles.pieChartLayout}>
                <Charts projects = {displayProjects}/>
            </div>

            <div className={LayoutStyles.dashboardProjectList}>
            {displayProjects?.map((displayProject => {
                return <SingleProjectView project= {displayProject}/>
            }))}
            </div>

        </div>
    );
}
