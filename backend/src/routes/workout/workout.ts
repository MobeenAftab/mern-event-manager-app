import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      msg: 'GET: workout',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      msg: 'GET: workout :id',
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      msg: 'POST: workout',
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      msg: 'DELETE: workout',
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      msg: 'PATHC: workout',
    });
  } catch (error) {
    next(error);
  }
});
export default router;
