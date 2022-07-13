import {
  AspectRatio,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import Layout from '../components/Layout';

const Profile = () => {
  return (
    <Flex
      position="relative"
      mt="40px"
      px="48px"
      pt="44px"
      h="288px"
      maxW="1336px"
      borderRadius="8px"
      bgSize="cover"
      // bgPosition="50% 0"
      // bgRepeat="no-repeat"
      backgroundImage="/assets/feedBg.png"
      sx={{
        '::before': {
          content: `""`,
          position: 'absolute',
          backgroundImage: 'linear-gradient(180deg,rgba(21,20,23,0) -40.73%,#151417 75.81%);',
          borderRadius: '8px',
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

const Comment = () => {
  return (
    <HStack align="start">
      <Image src="/assets/avatar.png" boxSize="24px" />
      <Flex direction="column">
        <Text fontSize="12px" fontWeight={700} letterSpacing="0.4px">
          username
        </Text>
        <Text fontSize="12px" letterSpacing="0.4px" color="#A19DAA">
          I remember when this first dropped!
        </Text>
        <HStack pt="8px">
          <Text fontSize="11px" color="#8C8797">
            3d
          </Text>
          <Text fontSize="11px" fontWeight={700}>
            Reply
          </Text>
        </HStack>
      </Flex>
      <Stack align="center">
        <Image src="/assets/heart.svg" />
        <Text fontSize="9px" color="#A19DAA">
          11
        </Text>
      </Stack>
    </HStack>
  );
};

const Clip = () => {
  return (
    <Flex mt="24px">
      <AspectRatio ratio={16 / 9} w="1030px">
        <video style={{ borderRadius: '8px 0px 0px 8px' }} autoPlay loop controls muted>
          <source src="https://content.jwplatform.com/videos/ruyaW4z3-zR83cUvz.mp4" type="video/mp4" />
        </video>
      </AspectRatio>
      <Flex borderRadius="0px 8px 8px 0px" direction="column" bg="fresh.900" w="306px" h="581px" px="16px">
        <HStack align="start" pt="12px">
          <Image src="/assets/avatar.png" boxSize="40px" />
          <Stack spacing="4px">
            <HStack spacing="0">
              <Text fontSize="12px" fontWeight="700">
                Name
              </Text>
              <Image boxSize="18px" src={'/assets/check.svg'} />
            </HStack>
            <Text fontSize="12px" letterSpacing="0.4px">
              Satoshi Nakamoto launched lots of decentralisation when Litecoin required many decentralised application
              <b> #sniped #teamsolomid</b>
            </Text>
            <HStack>
              <Image src="/assets/game.svg" />
              <Text fontSize="12px" color="#A19DAA" letterSpacing={0.5}>
                Call of duty: Warzone
              </Text>
            </HStack>
          </Stack>
        </HStack>
        <Divider color="#28262C" mt="12px" mb="8px" />
        <Flex direction="column" h="100%">
          <Text fontSize="12px" letterSpacing="0.4px" pb="12px">
            Comments{' '}
            <Text as="span" color="#8C8797">
              12
            </Text>
          </Text>
          <Stack flex="1 1 auto" overflowY="auto" h="0px" spacing="12px" pb="12px">
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
            <Comment />
          </Stack>
          <HStack pb="16px">
            <InputGroup>
              <Input
                variant="filled"
                fontSize="12px"
                placeholder="Add a comment..."
                borderRadius="20px"
                bg="#28262C"
                _focus={{ borderColor: 'fresh.200' }}
              />
              <InputRightElement w="50px" pr="5px">
                <IconButton
                  variant="ghost"
                  colorScheme="blackAlpha"
                  aria-label="send"
                  icon={<Image boxSize="17px" src="/assets/send.svg" />}
                />
              </InputRightElement>
            </InputGroup>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

const IndexPage = () => {
  return (
    <Layout>
      <Profile />
      <Clip />
      <Clip />
      <Clip />
    </Layout>
  );
};

export default IndexPage;
