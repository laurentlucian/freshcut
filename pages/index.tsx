import { Text } from '@chakra-ui/react';
import { User } from '@prisma/client';
import Clip from 'components/Clip';
import Profile from 'components/Profile';
import useSharedState from 'hooks/useSharedState';
import fetcher from 'lib/fetch';
import { useEffect } from 'react';
import Layout from '../components/Layout';
import { prisma, UserWithClips } from '../lib/prisma';

const IndexPage = ({ creator }: { creator: UserWithClips }) => {
  const [user, setUser] = useSharedState<User>('user', null);

  // creating a new user on every new page load
  // alternatively, I was keeping track of session in the browser's localStorage,
  // but it caused some bugs and I decided to keep it simpler instead
  useEffect(() => {
    const create = async () => {
      const newUser = await fetcher('/api/user/new');
      setUser(newUser);
    };

    if (!user) {
      create().catch(console.error);
    }
  }, []);

  if (!creator)
    return (
      <Layout>
        <Text>404 Not Found</Text>
      </Layout>
    );

  return (
    <Layout>
      <Profile creator={creator} />
      {creator.clips.map((clip) => (
        <Clip key={clip.id} clip={clip} />
      ))}
    </Layout>
  );
};

export const getServerSideProps = async () => {
  try {
    const creator = await prisma.user.findFirst({
      where: { creator: true },
      include: { clips: { include: { author: true, likes: true } }, followedBy: true },
    });

    return {
      props: {
        creator: JSON.parse(JSON.stringify(creator)),
      },
    };
  } catch (e) {
    console.log('getServerSideProps caught -> ', e);
    return {
      props: {
        creator: null,
      },
    };
  }
};

export default IndexPage;
