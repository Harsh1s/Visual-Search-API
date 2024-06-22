import { Image, Title, Grid } from '@mantine/core';

type PropType = {
  data:
    | {
        images: string[];
      }
    | null
    | undefined;
};

const ImageSearchResults = ({ data }: PropType) => {
  return (
    <>
      {data && (
        <>
          <Title order={4} pt="lg">
            Results
          </Title>
          <Grid columns={3} gutter="md">
            {data?.images.map((imageURL, index) => (
              <Grid.Col span={1} key={index}>
                <a href={imageURL} target="_blank">
                  <Image
                    src={imageURL}
                    alt={`Result ${index + 1}`}
                    style={{
                      objectFit: 'cover',
                      maxWidth: '10rem',
                      maxHeight: '10rem'
                    }}
                  />
                </a>
              </Grid.Col>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default ImageSearchResults;
