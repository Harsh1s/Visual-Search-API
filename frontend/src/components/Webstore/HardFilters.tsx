import {
  Card,
  Checkbox,
  Title,
  Text,
  Grid,
  RangeSlider,
  Center,
  Loader,
  Button
} from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { getCombinedSearchResults, ProductType, ResponseData } from '../../services/combinedSearch';
import { useState } from 'react';
import { IconArrowRight } from '@tabler/icons-react';

type PropType = {
  file: FileWithPath | null;
  query: string;
  setParallax: (show: boolean) => void;
  setProductsToShow: (products: ProductType[]) => void;
  closeModal: () => void;
};

const sizesList = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const HardFilters = (props: PropType) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ResponseData | null>(null);

  getCombinedSearchResults().then((response) => {
    setData(response);
    setLoading(false);
  });

  if (loading) {
    return (
      <Center p="lg">
        <Loader />
      </Center>
    );
  }

  if (!data) return null;

  return (
    <Card withBorder radius="md" className="w-1/2 h-full" m="sm">
      <Text size="sm">
        We have have found {data.products.length}+ results for you! You can narrow them further
        here!
      </Text>

      <br />

      {/* Brands */}
      <div>
        <Title order={5}>Brands</Title>
        <Grid>
          {data.brandList.map((brand) => (
            <Grid.Col span={4} key={brand}>
              <Checkbox label={brand} value={brand} checked />
            </Grid.Col>
          ))}
        </Grid>
      </div>

      <br />

      {/* Sizes */}
      <div>
        <Title order={5}>Sizes</Title>
        <Grid>
          {sizesList.map((size) => (
            <Grid.Col span={3} key={size}>
              <Checkbox label={size} value={size} checked />
            </Grid.Col>
          ))}
        </Grid>
      </div>

      <br />

      {/* Price */}
      <div>
        <Title order={5}>Price</Title>
        <RangeSlider
          defaultValue={data.priceRange}
          min={data.priceRange[0]}
          max={data.priceRange[1]}
          step={1}
          label={(value) => `Rs. ${value}`}
        />
      </div>

      <br />
      <Button
        variant="light"
        rightSection={<IconArrowRight size={14} />}
        color="teal"
        onClick={() => {
          props.setParallax(false);
          props.setProductsToShow(data.products);
          props.closeModal();
        }}>
        Show Me!
      </Button>
    </Card>
  );
};

export default HardFilters;
