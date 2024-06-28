import { Tabs } from '@mantine/core';
import ImageSearch from './components/ImageSearch';
import VideoSearch from './components/VideoSearch';
import TextSearch from './components/TextSearch';
import SearchSpotlight from './components/webstore/SearchSpotlight';

const App = () => {
  const tabData = [
    {
      name: 'Web Store',
      slug: 'web_store',
      component: <SearchSpotlight />,
      color: 'indigo'
    },
    {
      name: 'Image Search',
      slug: 'image_search',
      component: <ImageSearch />,
      color: 'blue'
    },
    {
      name: 'Video Search',
      slug: 'video_search',
      component: <VideoSearch />,
      color: 'teal'
    },
    {
      name: 'Text Search',
      slug: 'text_search',
      component: <TextSearch />,
      color: 'red'
    }
  ];

  return (
    <>
      <Tabs
        defaultValue={tabData[0].slug}
        orientation="horizontal"
        style={{
          width: '100%'
        }}>
        <Tabs.List grow justify="flex-end">
          {tabData.map((t) => (
            <Tabs.Tab value={t.slug} color={t.color} key={t.slug}>
              {t.name}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {tabData.map((t) => (
          <Tabs.Panel value={t.slug} key={t.slug}>
            {t.component}
          </Tabs.Panel>
        ))}
      </Tabs>
    </>
  );
};

export default App;
