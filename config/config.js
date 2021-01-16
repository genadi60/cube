module.exports = {
    development: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'localhost',
        privateKey: process.env.PRIVATE_KEY || 'privateKey',
        options: {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true,
            useFindAndModify: false,
        },
        dbUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cubes.iev4k.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        
    },
    production: {
    }
};