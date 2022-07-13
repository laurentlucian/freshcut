import { Button, Flex, Heading, HStack, Image, Link, Stack, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';

const Profile = () => {
  return (
    <Flex
      position="relative"
      px="48px"
      pt="44px"
      h="288px"
      maxW="1336px"
      borderRadius="8px"
      bgSize="cover"
      bgPosition="50% 0"
      bgRepeat="no-repeat"
      backgroundImage="/assets/feedBg.png"
      sx={{
        '::before': {
          content: `""`,
          position: 'absolute',
          backgroundImage: 'linear-gradient(180deg,rgba(21,20,23,0) -40.73%,#151417 75.81%);',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        },
      }}
    >
      <Stack zIndex="1">
        <HStack spacing="24px">
          <Image src={'/assets/avatar.png'} boxSize="128px" />
          <Stack flex="1 1 auto" spacing="12px">
            <HStack align="center">
              <Heading fontSize="34px">CreatorName</Heading>
              <Image src={'/assets/check.svg'} />
            </HStack>
            <HStack>
              <Text>
                <b>234</b> Followers
              </Text>
              <Text>
                <b>12</b> Views
              </Text>
              <Text>
                <b>52</b> Likes
              </Text>
            </HStack>
            <Text fontSize="15px">
              Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation
              incididunt aliquip deserunt reprehenderit magna.
            </Text>
          </Stack>
          <Button flex="0 0 100px">Follow</Button>
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

const IndexPage = () => {
  return (
    <Layout>
      <Profile />
    </Layout>
  );
};

export default IndexPage;
