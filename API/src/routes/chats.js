import { Router } from 'express';
import bcrypt from 'bcrypt';
import db from '../services/data_base.js';
import { setNotification } from './notifications.js';

const router = Router()

const emptyChat = {
    user: null,
    messages: [

    ]
}

router.post('/get-messages', async (req, res) => {
    const data = req.body;
    const user = await db.getFilteredItems('users', { email: data.user1 });


    try {

        if (user.length === 0) {
            return res.status(404).send({ status: 400, message: 'User not found', data: emptyChat });
        }

        for (const chat of user[0].chats) {
            if (chat.user === data.user2) {
                return res.send({ status: 200, data: chat });
            }
        }

        return res.send({ status: 400, message: 'Chat not found', data: emptyChat });

    } catch (error) {
        console.error('Error in /get-messages:', error);
        res.status(500).send({ status: 500, message: 'Internal server error', data: emptyChat });
    }
});


router.post('/send-message', async (req, res) => {
    const data = req.body;

    try {
        const [user1] = await db.getFilteredItems('users', { email: data.emailUser1 });
        const [user2] = await db.getFilteredItems('users', { email: data.emailUser2 });

        if (!user1 || !user2) {
            return res.status(404).send({ status: 'Users not found', data: [] });
        }

        let chatUpdated1 = false;
        user1.chats.forEach((chat, i) => {
            if (chat.user === data.emailUser2) {
                user1.chats[i].messages.push({ owner: data.emailUser1, message: data.message });
                chatUpdated1 = true;
            }
        });
        if (!chatUpdated1) {
            user1.chats.push({
                user: data.emailUser2,
                messages: [{ owner: data.emailUser1, message: data.message }],
            });
        }

        let chatUpdated2 = false;
        user2.chats.forEach((chat, i) => {
            if (chat.user === data.emailUser1) {
                user2.chats[i].messages.push({ owner: data.emailUser1, message: data.message })
                chatUpdated2 = true;
            }
        });
        if (!chatUpdated2) {
            user2.chats.push({
                user: data.emailUser1,
                messages: [{ owner: data.emailUser1, message: data.message }],
            });
        }

        await db.updateItem('users', { email: data.emailUser1 }, user1);
        await db.updateItem('users', { email: data.emailUser2 }, user2);
        if (user1.roll == 'costumer') {
            setNotification(user1, 'message')
        }

        res.status(200).send({ status: 200, message: 'Message sent successfully', data: emptyChat });

    } catch (error) {
        console.error('Error while sending message:', error);
        res.status(500).send({ status: 500, message: 'Internal server error', data: emptyChat });
    }
});


export default router