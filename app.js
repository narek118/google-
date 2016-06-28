import app from './lib/express';
import config from './config/index';

app.listen(config.PORT);
console.log("Listening at port",config.PORT);
