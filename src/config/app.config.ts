const appConfig =  () => ({
    PORT: parseInt(process.env.PORT, 10) || 3009,
    database: {
        protocol: process.env.DB_PROTOCOL || 'mongodb',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '27017',
        user: process.env.DB_USER || 'dev_local',
        password: process.env.DB_PASSWORD || 'secret',
        dbName: process.env.DB_NAME || 'event_local',
        authMechanism: process.env.DB_AUTHMECHANISM || 'DEFAULT',
    },
    BASE_URL: "",
    APP_ENV: process.env.APP_ENV  || 'local'
});


export default appConfig;