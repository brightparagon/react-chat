import express from 'express';
import world from './world';
const router = express.Router();

/*
  Make routers RESTful
*/
router.use('/world', world);

export default router;
