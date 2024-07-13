import { Router, Request, Response } from 'express';
import { AdRecord } from '../records/ad.record';

const adRouter = Router();

adRouter
  .get('/search/:name?', async (req: Request, res: Response) => {
    const ads = await AdRecord.findAll(req.params.name ?? '');
    res.json(ads);
  })
  .get('/:id', async (req: Request, res: Response) => {
    const ad = await AdRecord.getOne(req.params.id);
    res.json(ad);
  })
  .post('/', async (req: Request, res: Response) => {
    const ad = new AdRecord(req.body);
    await ad.insert();
    res.json(ad);
  });

export { adRouter };
