import { AdRecord } from '../records/ad.record';
import { pool } from '../utils/db';

afterAll(async () => {
  await pool.end();
});

test('AdRecord returns data from database for one entry', async () => {
  const ad = await AdRecord.getOne('abc');

  expect(ad).toBeDefined();

  if (ad !== null) {
    // console.log(ad);
    expect(ad.id).toBe('abc');
    expect(ad.name).toBe('testowa');
  }
});

test('Adrecord.getOne returns null from database for unexisting entry', async () => {
  const ad = await AdRecord.getOne('---');

  expect(ad).toBeNull();
});

test('AdRecord.findAll returns array of found entries.', async () => {
  const ads = await AdRecord.findAll('');

  expect(ads).not.toEqual([]);

  expect(ads[0].id).toBeDefined();
});

test('AdRecord.findAll returns array of found entries when searching for "a".', async () => {
  const ads = await AdRecord.findAll('a');

  expect(ads[0].id).toBeDefined();
});

test('Adrecord.findAll returns array or found entries when searching for sth that does exist', async () => {
  const ads = await AdRecord.findAll('---');

  expect(ads).toEqual([]);
});

test('Adrecord.findAll returns smaller amount of data', async () => {
  const ads = await AdRecord.findAll('');

  expect(ads[0].id).toBeDefined();
  expect(ads[0]).not.toHaveProperty('price')
});
