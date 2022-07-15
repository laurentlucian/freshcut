import {
  AspectRatio,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Clip, User } from '@prisma/client';
import useOnScreen from 'hooks/useOnScreen';
import useSharedState from 'hooks/useSharedState';
import fetcher from 'lib/fetch';
import { CommentWithAuthor } from 'lib/prisma';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import useSWR from 'swr';
import Comment from './Comment';

const Clip = ({ clip }: { clip: Clip & { author: User; likes: User[] } }) => {
  const [user] = useSharedState<User | null>('user');
  const { data, mutate } = useSWR<Clip & { author: User; likes: User[]; comments?: CommentWithAuthor[] }>(
    '/api/clip/' + clip.id,
    fetcher,
    {
      fallbackData: clip,
    },
  );
  // play/pause video when it enters/exits viewport
  const videoRef = useRef<HTMLVideoElement>(null);
  const isOn = useOnScreen(videoRef, '-400px');
  useEffect(() => {
    if (!isOn) return videoRef.current.pause();
    videoRef.current.play();
    fetcher(`/api/clip/${clip.id}/add_view`);
  }, [isOn]);

  const [inputFocus, setInputFocus] = useState(false);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  // whether a reply happens or not depends on this state
  // rather than in the content of the input (by @username)
  const [reply, setReply] = useState<CommentWithAuthor>(null);
  const onReply = (comment: CommentWithAuthor, replyTo: User) => {
    setReply(comment);
    // implementing @username as a side effect here
    // edge case: if user deletes @username from input, comment will still be a reply
    setInput((prev) => '@' + replyTo.username + ' ' + prev);
    inputRef.current.focus();
  };

  const commentsRef = useRef<HTMLDivElement>(null);
  const scrollToLastMessage = (behavior: ScrollBehavior) => {
    const lastChild = commentsRef.current.lastElementChild;
    lastChild.scrollIntoView({
      block: 'nearest',
      inline: 'start',
      behavior: behavior,
    });
  };

  const onSend = async () => {
    if (input.trim() === '') return;
    const res = await fetcher(`api/clip/${clip.id}/comment/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: input,
        authorId: user.id,
        commentId: reply ? reply.id : null,
      }),
    });
    flushSync(() => mutate({ ...data, comments: [...data.comments, { ...res, author: user }] }));
    setInput('');
    if (!reply) {
      scrollToLastMessage('smooth');
    }
    setReply(null);
  };

  const isLiked = data.likes.some((l) => l.id === user?.id);
  const onLike = async () => {
    await fetcher(`api/clip/${clip.id}/${isLiked ? 'dislike' : 'like'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
      }),
    });
    isLiked
      ? mutate({ ...data, likes: [...data.likes.filter((u) => u.id !== user.id)] })
      : mutate({ ...data, likes: [...data.likes, user] });
  };

  return (
    <Flex mt="24px">
      <AspectRatio ratio={16 / 9} w="1030px">
        <video ref={videoRef} style={{ borderRadius: '8px 0px 0px 8px' }} loop controls muted>
          <source src={clip.videoURL} type="video/mp4" />
        </video>
      </AspectRatio>
      <Flex borderRadius="0px 8px 8px 0px" direction="column" bg="fresh.900" w="306px" h="581px" px="16px">
        <HStack align="start" pt="12px">
          <Image src={clip.author.imageURL} boxSize="40px" />
          <Stack spacing="4px">
            <HStack spacing="0">
              <Text fontSize="12px" fontWeight="700">
                {clip.author.username}
              </Text>
              <Image boxSize="18px" src={'/assets/check.svg'} />
            </HStack>
            <Text fontSize="12px" letterSpacing="0.4px">
              {clip.description}
            </Text>
            <HStack>
              <Image src="/assets/game.svg" />
              <Text fontSize="12px" color="#A19DAA" letterSpacing={0.5}>
                {clip.game}
              </Text>
            </HStack>
          </Stack>
        </HStack>
        <Divider color="#28262C" mt="12px" mb="8px" />
        <Flex direction="column" h="100%">
          <Text fontSize="12px" letterSpacing="0.4px" pb="12px">
            Comments{' '}
            <Text as="span" color="#8C8797">
              {data.comments?.length}
            </Text>
          </Text>
          <Stack ref={commentsRef} flex="1 1 auto" overflowY="auto" h="0px" spacing="12px" pb="6px" pr="5px">
            {data.comments
              ?.filter((c) => !c.commentId)
              .map((comment) => (
                <Comment key={comment.id} comment={comment} onReply={onReply} />
              ))}
          </Stack>
          <HStack h="50px">
            <InputGroup>
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                variant="filled"
                fontSize="12px"
                placeholder="Add a comment..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSend();
                }}
                borderRadius="20px"
                bg="#28262C"
                _focus={{ borderColor: 'fresh.200' }}
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
              />
              {input.length > 0 && (
                <InputRightElement w="50px" pr="5px">
                  <IconButton
                    variant="ghost"
                    aria-label="send"
                    onMouseDown={onSend}
                    icon={<Image boxSize="17px" src="/assets/send.svg" />}
                  />
                </InputRightElement>
              )}
            </InputGroup>
            {!inputFocus && (
              <>
                <IconButton
                  flex="1 0 auto"
                  aria-label="share"
                  variant="ghost"
                  borderRadius="2px"
                  h="100%"
                  disabled
                  icon={
                    <Stack spacing="3px">
                      <Image w="18px" src="/assets/share.svg" />
                      <Text color="#A19DAA" fontSize="12px" fontWeight="normal">
                        0
                      </Text>
                    </Stack>
                  }
                />
                <IconButton
                  flex="1 0 auto"
                  onClick={onLike}
                  aria-label="like"
                  variant="ghost"
                  borderRadius="2px"
                  h="100%"
                  icon={
                    <Stack spacing="4px">
                      <Image
                        w="18px"
                        src={`/assets/heart${isLiked ? '-full' : ''}.svg`}
                        sx={{ filter: isLiked ? 'drop-shadow(0px 2px 8px rgba(255, 255, 255, 0.4))' : '' }}
                      />
                      <Text color="#A19DAA" fontSize="12px" fontWeight="normal">
                        {data.likes?.length}
                      </Text>
                    </Stack>
                  }
                />
              </>
            )}
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Clip;
