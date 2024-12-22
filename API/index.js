import express, { urlencoded, json } from 'express'
import users from './src/routes/users.js'
import cors from 'cors'
import chats from './src/routes/chats.js'
import projects from './src/routes/projects.js'
import payment from './src/routes/payment.js'
import notifications from './src/routes/notifications.js'

const app = express()
const port = process.env.port || 3001

app.use(urlencoded({ extended: false }))
app.use(json())
app.use(cors());

app.use(users)
app.use(chats)
app.use(projects)
app.use(payment)
app.use(notifications)

app.get('/', (req, res)=>{
    res.send('hello world, this is Hugo freelance api')
})



app.listen(port, () => { console.log(`Server: http://localhost:${port}`) })

