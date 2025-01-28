import { Router } from 'express';
import {AuthRoute} from './authRoutes';
// import transactionRoutes from './transactionRoutes';

const router = Router();
router.use('/auth',  AuthRoute);
// router.use('/transactions', transactionRoutes);
export default router;