const next = require('next')
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const authService = require('./services/auth')
const mongoose = require('mongoose')
const Project = require('./models/project')
const User = require('./models/user')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const config = require('./config/dev')
var nodemailer = require('nodemailer');
var cors = require('cors');

const secretData = [
    {
        title: "SecretData1",
        description: "Plans to buld spacecraft"
    },
    {
        title: "SecretData2",
        description: "Plans to buld spacecraft 2"
    },

]

var transport = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: config.USER,
        pass: config.PASS
    }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});


router.post('/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var recipient = req.body.recipient
    var content = `Greetings!, \n\n\n ${message} \n\nYou may contact me at: ${email}\n\nThanks,\n${name}`

    var mail = {
        from: name,
        to: recipient,
        subject: 'Request to join the project at IdeaPool',
        text: content
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                status: 'fail'
            })
        } else {
            res.json({
                status: 'success'
            })
        }
    })
}
)

mongoose.connect(config.DB_URI, { useNewUrlParser: true })
    .then(() => console.log('Database Connected')).catch(err => console.error(err))

app.prepare().then(() => {

    const server = express();
    server.use(bodyParser.json())
    server.use(cors())
    server.use('/', router)

    server.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send({ title: 'Unauthorized', detail: 'Unauthorized Access!' });
        }
    });

    // server.use('/api/v1/index', user)
    server.get('/api/v1/secret', authService.checkJWT, (req, res) => {
        return res.json(secretData)
    })

    // TODO get all from other users
    server.get('/api/v1/projects', (req, res) => {
        const { id } = req.params

        Project.find()
            .then((projects) => {
                // console.log("\n\n\nfsdfds", { id })
                // console.log("\n\n\nfsdfds", projects)
                res.json(projects)
            })
            .catch((err) => { res.status(400).send(err) })
    })

    server.get('/api/v1/projects/:id', (req, res) => {
        const { id } = req.params

        Project.find({ id: id })
            .then((project) => {
                if (!project) {
                    res.sendStatus(404)
                }

                res.json(project[0])
            })
            .catch((err) => {
                res.status(400).send(err)
            })
    })

    server.post('/api/v1/projects', (req, res) => {

        const proj = new Project(req.body)
        proj.save()
            .then((doc) => {
                res.send(doc)
            })
            .catch((err) => { res.status(400).send(err) })

    })

    server.patch('/api/v1/projects/:id', (req, res) => {

        const { id } = req.params
        const proj = new Project(req.body)
        Project.findOneAndUpdate({ id: id }, { $set: proj }, { new: true })
            .then((doc) => {
                res.send(doc)
            })
            .catch((err) => { res.status(400).send(err) })

    })


    server.delete('/api/v1/projects/:id', (req, res) => {
        const { id } = req.params


        Project.remove({ id: id })
            .then((doc) => {
                res.send(doc)
            })
            .catch((err) => { res.status(400).send(err) })
    })

    // we are handling all of the request coming to our server
    server.get('*', (req, res) => {
        // next.js is handling requests and providing pages where we are navigating to
        return handle(req, res)
    })

    const PORT = process.env.PORT || 3000;

    server.listen(PORT, (err) => {
        if (err) throw err
        console.log('> Ready on port ' + PORT)
    })
})