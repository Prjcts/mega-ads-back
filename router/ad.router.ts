import { Router, Request, Response } from 'express';
import { AdRecord } from '../records/ad.record';

const adRouter = Router();

adRouter
  .get('/search/:name?', async (req: Request, res: Response) => {
    const { name } = req.params;
    const ads = await AdRecord.findAll(name ?? '');
    res.json(ads);
  })
  .get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const ad = await AdRecord.getOne(id);
    res.json(ad);
  })
  .post('/', async (req: Request, res: Response) => {
    const ad = new AdRecord(req.body);
    await ad.insert();
    res.json(ad);
  });

export { adRouter };
