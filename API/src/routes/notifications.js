import { Router } from 'express';
import bcrypt from 'bcrypt';
import db from '../services/data_base.js';

const router = Router();

router.post('/delete-notification', async (req, res) => {
    try {
        const data = req.body;
        const [user] = await db.getFilteredItems('users', { email: data.email });

        if (!user) {
            return res.status(404).send({ status: 404, message: 'User not found' });
        }

        const notificationIndex = user.notifications.findIndex((notification) => notification.id === data.notificationId);
        console.log(notificationIndex)
        if (notificationIndex === -1) {
            return res.status(404).send({ status: 404, message: 'Notification not found' });
        }

        user.notifications.splice(notificationIndex, 1);
        await db.updateItem('users', { email: data.email }, user);

        res.send({ status: 200, data: user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 500, message: 'Internal server error' });
    }
});

export default router

export const setNotification = async (costumer, type)=>{
    const [user] = await db.getFilteredItems('users', { roll: 'admin' });

    user.notifications.push({ user: costumer.email, type: type, id: costumer.email +'-'+ Math.random() })
    await db.updateItem('users', { roll: 'admin' }, user);

}








