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
      //To send req.body, put used instead of delete
      const {data} = await axios.put(
        `/deleteTheProject/${projectName}`, 
        {
          data: projectDeleter
        }
      );

      if(data.error){
        console.log(data.error);
        // return toast.error(data.error);
      }else{
        console.log("Project Deleted");
        // return toast.success("Project Deleted");
      }

    } catch (error) {
      console.log("Project didn't deleted");
      // return toast.error(error);
    }
  }

  return (
    <div className='single-project'>
      <div>
        <div className='project-name'>
            <p>{project.projectName}</p>
          </div>

          <div className='time'>
            <p>{project.startDate}<span> to </span>{project.dueDate}</p>
          </div>

          <div className='state'>
            <p>State {project.projectState}</p>
          </div>
          
      </div>

      <div>
        <div className='option-button'>
              <button onClick={projectModify}>Modify</button>
            </div>
        <div className='option-button'>
          <button onClick={viewProject}>View</button>
        </div>

        <div className='option-button'>
          <form onSubmit={deleteProject}>
            <button type='submit'>Remove</button>
          </form>
        </div>
      </div>

    </div>
  );
}
