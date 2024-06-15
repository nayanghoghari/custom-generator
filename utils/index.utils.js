const { connect, connection } = require('mongoose');
const connectDB = (dbUri) => {
    return connect(dbUri);
}

connection.on('connected', ()=> {
    console.log("Database connected successfully!")
})

module.exports = { connectDB }