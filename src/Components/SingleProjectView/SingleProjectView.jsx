import React, { useContext } from 'react'
import "./SingleProjectView.css";
import { UserContext } from '../../Context/UserContex';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function SingleProjectView({project}) {
  const {
    projectName
  } = project;

  const {
    setActivity, 
    setCurrentProject,
    user
  } = useContext(UserContext);

  const projectDeleter = user.email;

  const viewProject = async (e) => {
    setCurrentProject({
      currentProjectOwner:project.projectOwner,
      currentProjectName: project.projectName
    });
    setActivity("project-content-view");
  }

  const projectModify = async (e) => {
    setCurrentProject({
      currentProjectOwner:project.projectOwner,
      currentProjectName: project.projectName
    });
    setActivity("project-modify");
  }

  const deleteProject = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.delete(
        `/deleteTheProject/${projectName}`, 
        //isssue here, req body dont parse <-CHECK THIS
        {
          data: projectDeleter
        }
      );

      console.log("fff");
      if(data.error){
        console.log(data.error);
        // return toast.error(data.error);
      }else{
        // return toast.success("Project Deleted");
        console.log("Project Deleted");
      }

    } catch (error) {
      return toast.error(error);
    }
  }

  return (
    <div className='single-project'>
        <div className='project-name'>
          <p>{project.projectName}</p>
        </div>

        <div className='time'>
          <p>{project.startDate}<span> to </span>{project.dueDate}</p>
        </div>

        <div className='state'>
          <p>State {project.projectState}</p>
        </div>
        
        <div className='modify'>
          <button onClick={projectModify}>Modify</button>
        </div>

        <div className='modify'>
          <button onClick={viewProject}>View</button>
        </div>

        <div className='modify'>
          <form onSubmit={deleteProject}>
            <button type='submit'>Remove</button>
          </form>
        </div>

    </div>
  );
}
