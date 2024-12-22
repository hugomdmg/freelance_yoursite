import { Router } from 'express';
import db from '../services/data_base.js';
import { setNotification } from './notifications.js';


const router = Router();

router.post('/create-project', async (req, res) => {
    const data = req.body;
    const [user] = await db.getFilteredItems('users', { email: data.email });
    try {
        if (!user) {
            return res.status(404).send({ status: 404, message: 'User not found', data: null });
        }

        const newProject = {
            id: `${data.email}-${Date.now()}-${Math.random()}`,
            name: 'new Project',
            status: 'Not Finished',
            link: '',
            dates: [],
            missingPayment: 0,
            totalPaid: 0,
            trelloLink: '',
        };

        user.projects.push(newProject);
        await db.updateItem('users', { email: data.email }, user);
        setNotification(user, 'project created')

        res.send({ status: 200, message: 'success', data: user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, message: 'Internal server error', data: null });
    }
});

router.post('/delete-project', async (req, res) => {
    const data = req.body;
    const [user] = await db.getFilteredItems('users', { email: data.email });
    try {
        if (!user) {
            return res.status(404).send({ status: 404, message: 'User not found', data: null });
        }

        const projectIndex = user.projects.findIndex((project) => project.id === data.project.id);
        if (projectIndex === -1) {
            return res.status(404).send({ status: 404, message: 'Project not found', data: null });
        }

        user.projects.splice(projectIndex, 1);
        await db.updateItem('users', { email: data.email }, user);
        setNotification(user, 'project deleted')

        res.send({ status: 200, message: 'success', data: user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, message: 'Internal server error', data: null });
    }
});

router.post('/update-project', async (req, res) => {
    try {
        const data = req.body;
        const [user] = await db.getFilteredItems('users', { email: data.email });

        if (!user) {
            return res.status(404).send({ status: 404, message: 'User not found' });
        }

        const projectIndex = user.projects.findIndex((project) => project.id === data.project.id);
        if (projectIndex === -1) {
            return res.status(404).send({ status: 404, message: 'Project not found' });
        }

        user.projects[projectIndex] = data.project;
        await db.updateItem('users', { email: data.email }, user);
        setNotification(user, 'project updated')

        res.send({ status: 200, data: user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, message: 'Internal server error' });
    }
});

export default router;
