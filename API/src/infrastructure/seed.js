import db from '../services/data_base.js';
import bcrypt from 'bcrypt';

const password1 = await bcrypt.hash('password1', 10);
const password2 = await bcrypt.hash('password2', 10);
const password3 = await bcrypt.hash('password3', 10);



const seedData = async () => {
    const data = [
        {
            email: 'admin',
            password: password1,
            roll: 'admin',
            projects: [],
            notifications:[],
            chats: [
                {
                    user: 'usuario 2',
                    messages: [
                        { owner: 'usuario 2', message: 'hola' },
                        { owner: 'admin', message: 'dime' }

                    ]
                },
                {
                    user: 'usuario 3',
                    messages: [
                        { owner: 'usuario 3', message: 'tengo una duda' },
                        { owner: 'admin', message: 'cuentame' }

                    ]
                }
            ]
        },
        {
            email: 'usuario 2',
            password: password2,
            roll: 'costumer',
            notifications:[],
            projects: [
                {
                    id:23,
                    name: 'Project 1',
                    status: 'Finished',
                    link: 'https://main.d183snd9vhmvw3.amplifyapp.com/',
                    dates: ['23/01/2025', '12/02/2025'],
                    missingPayment: 200,
                    totalPaid: 300,
                    trelloLink: '',
                  },
                  {
                    id:123,
                    name: 'Project 2',
                    status: 'Not Finished',
                    link: 'https://main.d183snd9vhmvw3.amplifyapp.com/',
                    dates: ['05/12/2024', '15/04/2025'],
                    missingPayment: 6600,
                    totalPaid: 300,
                    trelloLink: '',
                  },
                  {
                    id:123123,
                    name: 'Project 3',
                    status: 'Finished',
                    link: 'https://main.d183snd9vhmvw3.amplifyapp.com/',
                    dates: ['01/05/2025', '20/06/2025'],
                    missingPayment: 200,
                    totalPaid: 300,
                    trelloLink: '',
                  },
            ],
            chats: [
                {
                    user: 'admin',
                    messages: [
                        { owner: 'usuario 2', message: 'hola' },
                        { owner: 'admin', message: 'dime' }
                    ]
                }
            ]
        },
        {
            email: 'usuario 3',
            password: password3,
            roll: 'costumer',
            notifications:[],
            projects: [
                {
                    id:32232131,
                    name: 'Project 1',
                    status: 'Finished',
                    link: 'https://main.d183snd9vhmvw3.amplifyapp.com/',
                    dates: ['23/01/2025', '12/02/2025'],
                    missingPayment: 200,
                    totalPaid: 300,
                    trelloLink: '',
                  },
            ],
            chats: [
                {
                    user: 'admin',
                    messages: [
                        { owner: 'usuario 3', message: 'tengo una duda' },
                        { owner: 'admin', message: 'cuentame' }
                    ]
                }
            ]
        }
    ];

    try {
        await db.connect();

        for (const user of data) {
            const existing = await db.getFilteredItems('users', { email: user.email });
            if (existing.length === 0) {
                await db.addItem('users', user);
            }
        }
        console.log('Seed data inserted successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await db.disconnect();
    }
};

seedData();




