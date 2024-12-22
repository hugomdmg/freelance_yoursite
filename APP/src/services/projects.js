import api from './api'


export const updateProject = async (selectedProject, user) => {
    selectedProject.dates = sortDates(selectedProject.dates)

    const data = { project: selectedProject, email: user.email }
    const res = await api.post('/update-project', data)
    return (res.data)

}

export const deleteProject = async (project, user) => {
    try {
        const data = { project, email: user.email };
        const res = await api.post('/delete-project', data);

        if (res.data) return res.data
        if (!res.data) return user
    } catch (error) {
        console.error("Error al eliminar el proyecto:", error);
        return user
    }
};

export const createProject = async (user) => {
    try {
        const res = await api.post('/create-project', user);
        if (res.data) return (res.data);
        if (!res.data) return user

    } catch (error) {
        console.error(error);
        return user
    }
};

export const changeStatus = async (project, user) => {
    try {
        const updatedProjects = [...user.projects];
        const index = updatedProjects.findIndex(p => p.id === project.id);
        if (index !== -1) {
            const status = updatedProjects[index].status === 'Finished' ? 'Not Finished' : 'Finished';
            updatedProjects[index] = { ...updatedProjects[index], status };

            const res = await api.post('/update-project', { email: user.email, project: updatedProjects[index] });

            if (res.data) {
                return ({ ...user, projects: updatedProjects });
            }
        }
    } catch (error) {
        console.error("Error:", error);
        return user
    }
};

const sortDates = (dates) => {
    return (
        dates.map(date => {
            const [day, month, year] = date.split('/');
            const formattedDate = new Date(year, month - 1, day);
            return formattedDate;
        })
            .filter(date => date !== null)
            .sort((a, b) => a - b)
            .map(date => {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();

                return `${day}/${month}/${year}`;
            }))
}