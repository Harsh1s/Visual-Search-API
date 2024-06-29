import products from './products.json';

export type ProductType = {
  id: number;
  name: string;
  price: number;
  imageURL: string;
  rating: number;
  amazonURL: string;
  brand: string;
  type: 'query' | 'home';
};

export type ResponseData = {
  products: ProductType[];
  brandList: string[];
  priceRange: [number, number];
};

export const getCombinedSearchResults = async (): Promise<ResponseData> => {
  const productsList = (products as ProductType[]).filter((p) => p.type === 'query');

  const brandList = Array.from(new Set(productsList.map((product) => product.brand)));
  const minPrice = Math.min(...productsList.map((product) => product.price));
  const maxPrice = Math.max(...productsList.map((product) => product.price));

  // Choose a random timeout between 0.5 to 2 seconds
  const timeout = Math.random() * 1500 + 500;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        products: productsList,
        brandList,
        priceRange: [minPrice, maxPrice]
      });
    }, timeout);
  });
};
