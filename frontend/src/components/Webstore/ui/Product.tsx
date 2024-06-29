import { Card, Image, Group, Text, Badge, Button, Flex, Center } from '@mantine/core';
import { ProductType } from '../../../services/combinedSearch';
import { IconStarFilled } from '@tabler/icons-react';

type PropType = {
  product: ProductType;
};

function Product({ product }: PropType) {
  const numberStars = Math.round(product.rating);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w={300} h={380}>
      <Card.Section>
        <Image src={product.imageURL} mah={200} width={250} alt="Product image" />
      </Card.Section>

      <Center>
        <Group justify="space-between">
          <Text fw={500} pt="md">
            {product.name}
          </Text>
          <Badge color="white">
            <Flex direction="row" align="center">
              {Array.from({ length: numberStars }).map(() => (
                <IconStarFilled key={Math.random()} size={14} color="yellow" />
              ))}
              {Array.from({ length: 5 - numberStars }).map(() => (
                <IconStarFilled key={Math.random()} size={14} color="gray" />
              ))}
            </Flex>
          </Badge>
        </Group>
      </Center>

      <Button
        color="yellow"
        fullWidth
        mt="md"
        radius="md"
        onClick={() => {
          window.history.pushState({}, '', product.amazonURL);
        }}>
        Buy Now!
      </Button>
    </Card>
  );
}

export default Product;
