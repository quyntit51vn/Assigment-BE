import { config } from 'dotenv';
import keys from './keys';
config();

let allowList: any;
switch (process.env.NODE_ENV) {
    case 'development':
        allowList = keys.whitelist;
        break;
    case 'staging':
        allowList = keys.whitelist;
        break;
    case 'production':
        allowList = keys.whitelist;
        break;
    case 'test':
        allowList = keys.whitelist;
        break;
    default:
        allowList = '*';
        break;
}

const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if ((typeof allowList == 'string' && allowList == '*') || allowList.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false }; // disable CORS for this request
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
};

export default corsOptionsDelegate;
