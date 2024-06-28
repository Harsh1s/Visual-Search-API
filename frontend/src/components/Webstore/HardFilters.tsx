import { Card, Checkbox, Title, Text, Grid, RangeSlider } from '@mantine/core';

const HardFilters = () => {
  const brandsList = ['Lifestyle', 'Max', 'Forever 21', 'United Colors of Benniton', 'Zara'];
  const sizesList = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <Card withBorder radius="md" className="w-1/2 h-full">
      <Text size="sm">You can apply some filter as well!</Text>

      {/* Brands */}
      <div>
        <Title order={5}>Brands</Title>
        <Grid>
          {brandsList.map((brand) => (
            <Grid.Col span={4} key={brand}>
              <Checkbox label={brand} value={brand} />
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
              <Checkbox label={size} value={size} />
            </Grid.Col>
          ))}
        </Grid>
      </div>

      <br />

      {/* Price */}
      <div>
        <Title order={5}>Price</Title>
        <RangeSlider defaultValue={[10, 50]} min={0} max={100} step={1} />
      </div>
    </Card>
  );
};

export default HardFilters;
