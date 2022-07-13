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
  const [, setUser] = useSharedState<User>('user', null);

  useEffect(() => {
    const existingUser = localStorage.getItem('user');
    if (existingUser) {
      setUser(JSON.parse(existingUser));
      return;
    }

    const create = async () => {
      const newUser = await fetcher('/api/user/new');
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    };

    create().catch(console.error);
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

export const getStaticProps = async () => {
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
    console.log('getStaticProps caught -> ', e);
    return {
      props: {
        creator: null,
      },
    };
  }
};

export default IndexPage;
