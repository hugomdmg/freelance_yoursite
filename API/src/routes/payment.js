import { Router } from 'express';
import db from '../services/data_base.js';
import { setNotification } from './notifications.js';

const router = Router();

router.post('/make-payment', async (req, res) => {
    const data = req.body

    const [user] = await db.getFilteredItems('users', { email: data.email })
    const projectIndex = user.projects.findIndex(project => project.id == data.projectId)
    user.projects[projectIndex].missingPayment -= data.paymentData.payment

    console.log(data.paymentData)

    const result = await db.updateItem('users', {email:data.email}, user)

    setNotification(user, 'payment')

    res.send({ status: 200, value: result })

});

export default router;
