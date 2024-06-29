import { ProductType } from '../../../services/combinedSearch';
import Product from './Product';

import './Home.css';
import { Center, Grid, Title } from '@mantine/core';

type PropType = {
  products: ProductType[];
  showParallax: boolean;
};

const Home = (props: PropType) => {
  return (
    <div className="home">
      <div className="home__container">
        {props.showParallax ? (
          <img
            className="home__image"
            src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
            alt="Image showcasing a collage of Amazon Prime Video shows"
          />
        ) : (
          <Center>
            <Title order={2} p="lg">
              Your Search Results
            </Title>
          </Center>
        )}
      </div>

      <Grid mx={64} px={64}>
        {props.products.map((product) => (
          <Grid.Col span={3} key={product.id}>
            <Product product={product} />
          </Grid.Col>
        ))}
      </Grid>

      <br />
      <br />
    </div>
  );
};

export default Home;
