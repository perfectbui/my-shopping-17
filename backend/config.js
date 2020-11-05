require('dotenv').config()

module.exports =  {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: 'mongodb+srv://perfectbui3011:haopro123@cluster0.2hnur.gcp.mongodb.net/dbname1?retryWrites=true&w=majority' || 'mongodb://localhost/amazona',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret'
}