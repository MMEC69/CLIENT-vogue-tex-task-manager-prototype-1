import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContex';
import SingleProjectView from '../SingleProjectView/SingleProjectView';
import styles1 from "../ComponentCSS/Layout.module.css";

export default function ProjectSearchResult() {
    const { 
        activity, 
        searchResult
    } = useContext(UserContext);

    return (
    <div className={styles1.content}>
        {
          searchResult?.map((singleSearchResult => {
            return <SingleProjectView project= {singleSearchResult}/>
          }))
        }
    </div>
  );
}
