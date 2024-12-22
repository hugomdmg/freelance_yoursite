import React, { useState, useEffect } from 'react';
import Chat from './shared/Chat';
import Dates from './shared/Calendar';
import ProjectsList from './projects-list/ProjectsList';
import ProjectDetails from './project-details/ProjectDetails';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../infraestructure/AuthContext';

const CostumerMain = () => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const { user, authLogin, setUser } = useAuth();
  const [allDates, setAllDates] = useState([])


  useEffect(() => {
    if (!user || user.roll !== "costumer") {
      navigate('/login');
    }

    const updatedDates = []
    if (user) {
      user.projects.forEach(project => {
        project.dates.forEach(date => {
          updatedDates.push(date)
        })
      })
      setAllDates(updatedDates)
    }


  }, [user, navigate]);

  if (!user) {
    return null
  }

  return (
    <div className="flex p-4 bg-[#d7e9e3] dark:bg-gray-900 min-h-screen gap-4">
      <div className="flex-1 bg-[#eaf1ef] dark:bg-gray-800 shadow-md rounded-lg p-6">
        {user.projects && (
          <ProjectsList
            admin={false}
            setSelectedProject={setSelectedProject}
            setEdit={setEdit}
            user={user}
            setUser={authLogin}
          />
        )}
        {selectedProject && (
          <ProjectDetails
            admin={false}
            user={user}
            setUser={authLogin}
            setSelectedProject={setSelectedProject}
            selectedProject={selectedProject}
            edit={edit}
            setEdit={setEdit}
          />
        )}
      </div>

      <div className="flex bg-[#d7e9e3] dark:bg-gray-900 min-h-screen ">
        <div className="flex-1 bg-[#eaf1ef] dark:bg-gray-800 shadow-md rounded-lg p-6">
          <Dates
            setSelectedProject={setSelectedProject}
            selectedProject={selectedProject ? selectedProject : null}
            user={user}
            dates={selectedProject ? selectedProject.dates : allDates}
            setUser={setUser}
          />
          <Chat user1={user} user2={{ email: process.env.REACT_APP_ADMIN }} />
        </div>
      </div>
    </div>
  );
};

export default CostumerMain;


