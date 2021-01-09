module.exports = {
    development: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost',
        user: process.env.DB_USER || '',
        pass: process.env.DB_PASS || '',
        dbName: process.env.DB_NAME || '',
        options: {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        },
        dbUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cubes.iev4k.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    },
    production: {
    }
};