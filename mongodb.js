// crud create read update delete
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'ideapool-db'
const id = new ObjectID()

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.log('Unable to connect to DB')
    }
    const db = client.db(databaseName)

    db.collection('users').findOne({ name: 'Aashwin' }, (error, user) => {
        if (error) {
            return console.log('Unable to fetch')
        }
        console.log(user)
    })
})






