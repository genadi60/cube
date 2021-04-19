module.exports = {
    development: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost',
        privateKey: process.env.PRIVATE_KEY || 'privateKey',
        dbUser: process.env.DB_USER || 'user',
        dbPassword: process.env.DB_PASS || 'password',
        dbName: process.env.DB_NAME || 'name',
        options: {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true,
            useFindAndModify: false,
        },
    },
    production: {
        port: 3000,
        host: 'localhost',
        privateKey: 'privateKey',
        dbUser: 'user',
        dbPassword: 'password',
        dbName: 'name',
        options: {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true,
            useFindAndModify: false,
        },
    }
};