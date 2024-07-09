import { AdRecord } from '../records/ad.record';

const defaultObj = {
  id: 'dg',
  name: 'Test Name',
  description: 'Test Description',
  price: 3000,
  url: 'http://localhost:3000',
  lat: 50,
  lon: 0.09,
};

test('Can build AdRecord', () => {
  const ad = new AdRecord(defaultObj);

  expect(ad.name).toBe('Test Name');
  expect(ad.description).toBe('Test Description');
  expect(ad.price).toBe(3000)
});

test('Validate invalide price', () => {
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        price: -4,
      })
  ).toThrow('The price of the Ad must be between 1 and 9 999 999');
});

test('Validate invalide name', () => {
  expect(
    () =>
      new AdRecord({
        ...defaultObj,
        name: '',
      })
  ).toThrow('The name of the Ad must be between 1 and 100 characters');
});

