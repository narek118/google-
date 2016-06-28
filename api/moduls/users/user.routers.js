import {Router} from 'express';
import * as userHandlers from './user.handlers.js'


export function init(api){

    const router = new Router();

    router.get('/',userHandlers.getAllUsers);
    router.get('/add',userHandlers.addUser);

    api.use('/users',router);
}