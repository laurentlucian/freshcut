import { Button, Flex, Heading, HStack, Image, Link, Stack, Text } from '@chakra-ui/react';
import { User } from '@prisma/client';
import useSharedState from 'hooks/useSharedState';
import fetcher from 'lib/fetch';
import { UserWithClips } from 'lib/prisma';
import { useEffect, useState } from 'react';

const Profile = ({ creator }: { creator: UserWithClips }) => {
  const [user] = useSharedState<User | null>('user');
  // I'd prefer using SWR mutation, which includes revalidation after optimistic update
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const views = creator.clips.reduce((acc, clip) => acc + clip.viewCount, 0);
  const likes = creator.clips.reduce((acc, clip) => acc + clip.likes?.length, 0);

  const onFollow = async () => {
    setIsFollowing(!isFollowing);
    await fetcher(`/api/user/${isFollowing ? 'unfollow' : 'follow'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        followId: creator.id,
        followedBy: user.id,
      }),
    });
  };

  useEffect(() => {
    setIsFollowing(creator.followedBy.some((u) => u.id === user?.id));
  }, [user]);

  return (
    <Flex
      position="relative"
      px="48px"
      pt="44px"
      h="288px"
      w="100%"
      maxW="1336px"
      borderRadius="8px"
      bgSize="100% 100%"
      backgroundImage="/assets/feedBg.png"
      sx={{
        '::before': {
          content: `""`,
          position: 'absolute',
          backgroundImage: 'linear-gradient(180deg, rgba(21, 20, 23, 0.1) 0%, #151417 100%);',
          borderRadius: '8px',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        },
      }}
    >
      <Stack zIndex="1" w="100%" spacing="28px">
        <HStack spacing="24px">
          <Image src={creator.imageURL} boxSize="128px" />
          <Stack flex={1} spacing="12px">
            <HStack align="center">
              <Heading fontSize="34px">{creator.username}</Heading>
              <Image src={'/assets/check.svg'} />
            </HStack>
            <HStack>
              <Text>
                <b>{creator.followedBy.filter((u) => u.id !== user.id).length + (isFollowing ? 1 : 0)}</b> Followers
              </Text>
              <Text>
                <b>{views}</b> Views
              </Text>
              <Text>
                <b>{likes}</b> Likes
              </Text>
            </HStack>
            <Text fontSize="15px">{creator.bio}</Text>
          </Stack>
          <Button onClick={onFollow} flex="0 0 100px" colorScheme="fresh">
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        </HStack>
        <HStack spacing="18px">
          <Link href="https://discord.gg" target="_blank">
            <Image src="/assets/DC.svg" />
          </Link>
          <Link href="https://twitch.tv" target="_blank">
            <Image src="/assets/TTV.svg" />
          </Link>
          <Link href="https://youtube.com" target="_blank">
            <Image src="/assets/YT.svg" />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <Image src="/assets/IG.svg" />
          </Link>
        </HStack>
      </Stack>
    </Flex>
  );
};

export default Profile;
