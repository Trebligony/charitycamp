export const getSavedProjectIds = () => {
    const savedProjectIds = localStorage.getItem('saved_projects')
      ? JSON.parse(localStorage.getItem('saved_projects'))
      : [];
  
    return savedProjectIds;
  };
  
  export const saveProjectIds = (projectIdArr) => {
    if (projectIdArr.length) {
      localStorage.setItem('saved_projects', JSON.stringify(projectIdArr));
    } else {
      localStorage.removeItem('saved_projects');
    }
  };
  
  export const removeProjectId = (pId) => {
    const savedProjectIds = localStorage.getItem('saved_projects')
      ? JSON.parse(localStorage.getItem('saved_projects'))
      : null;
  
    if (!savedProjectIds) {
      return false;
    }
  
    const updatedSavedProjectIds = savedProjectIds?.filter((savedProjectId) => savedProjectId !== pId);
    localStorage.setItem('saved_projects', JSON.stringify(updatedSavedProjectIds));
  
    return true;
  };