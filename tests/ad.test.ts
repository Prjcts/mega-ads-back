import { AdRecord } from '../records/ad.record';
import { pool } from '../utils/db';
import {NewAdEntity} from '../types/ad/ad-entity'

const defaultObject = {
  id: undefined,
  name: '[TDD test] Test Name',
  description: 'blacharze ram pam pam',
  price: 9,
  url: 'https://wp.pl',
  lat: 9,
  lon: 9,
};

afterAll(async () => {
  const adRecords = await AdRecord.findAll('[TDD test] Test Name');
  for (const adRecord of adRecords) {
    const ad = await AdRecord.getOne(adRecord.id);
    if (ad) {
      await pool.execute('DELETE FROM `ads` WHERE `id` = :id', { id: ad.id });
    }
  }
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
  expect(ads[0]).not.toHaveProperty('price');
});

// test('AdRecord.insert returns new UUID', async () => {
//   const ad = new AdRecord(defaultObject);
//   await ad.insert();
//   expect(ad.id).toBeDefined();
//   expect(typeof ad.id).toBe('string');
// });

test('AdRecord.insert inserts data to database.', async () => {
  const ad = new AdRecord(defaultObject);
console.log(`defaultObject ${JSON.stringify(ad)}`);
  await ad.insert();

  const foundAd = await AdRecord.getOne(ad.id);

  console.log('foundAd', foundAd);

  expect(foundAd).toBeDefined();

  expect(foundAd).not.toBeNull();

  if (foundAd !== null) {
    expect(foundAd.id).toBe(ad.id);
  }
});
