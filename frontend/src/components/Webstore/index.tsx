import { useState } from 'react';
import SearchSpotlight from './SearchSpotlight';
import Header from './ui/Header';
import Home from './ui/Home';
import { ProductType } from '../../services/combinedSearch';

import products from '../../services/products.json';

const Webstore = () => {
  const [showParallax, setShowParallax] = useState<boolean>(true);
  const [productsToShow, setProductsToShow] = useState<ProductType[]>(
    (products as ProductType[]).filter((p) => p.type === 'home')
  );

  return (
    <>
      <Header />
      <Home products={productsToShow} showParallax={showParallax} />
      <SearchSpotlight setParallax={setShowParallax} setProductsToShow={setProductsToShow} />
    </>
  );
};

export default Webstore;
