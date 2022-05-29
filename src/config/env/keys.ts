import keysProd from './production';
import keysStag from './staging';
import keysDev from './development';
let env: any;

if (process.env.NODE_ENV === 'development') {
    env = keysDev;
} else if (process.env.NODE_ENV === 'production') {
    env = keysProd;
} else if (process.env.NODE_ENV === 'staging') {
    env = keysStag;
} else {
    env = keysDev;
}
const keys = env;
export default keys;
