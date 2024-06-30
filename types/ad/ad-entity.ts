interface NewAdEntity extends Omit<AdEntity, 'id'> {
  id?: string;
}

interface AdEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  url: string;
  lat: number;
  lon: number;
}

export { NewAdEntity, AdEntity };
