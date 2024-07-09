interface NewAdEntity extends Omit<AdEntity, 'id'> {
  id?: string;
}

interface SimpleAdEntity {
  id: string;
  lat: number;
  lon: number;
}

interface AdEntity extends SimpleAdEntity {
  name: string;
  description: string;
  price: number;
  url: string;
}

export { NewAdEntity, AdEntity, SimpleAdEntity };
