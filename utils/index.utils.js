const { connect, connection } = require('mongoose');
module.exports = connectDB = (dbUri) => {
    return connect(dbUri);
}

connection.on('connected', ()=> {
    console.log("Database connected successfully!")
})