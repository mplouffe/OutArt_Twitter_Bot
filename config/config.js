// pull in third party libraries
const env = process.env.NODE_ENV || 'development';

if(env === 'development' || env === 'test') {
    let config = require('./config.json');
    let envConfig = config[env];
    Object.keys(envConfig).forEach((key) => {
        console.log(key);
        process.env[key] = envConfig[key];
    });
}