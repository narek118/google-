import mongoose from 'mongoose';
import config from '../config/index';


export function init(){
    console.log("Connecting", config.db);
    mongoose.set("debug",true);
    mongoose.connect(config.db);
   // mongoose.set('debug', true);
}