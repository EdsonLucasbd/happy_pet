import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import ongsController from './controller/ongsController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/ongs', ongsController.index);
routes.get('/ongs/:id', ongsController.show);
routes.post('/ongs', upload.array('images'), ongsController.create);

export default routes;