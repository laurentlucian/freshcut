import { Flex, HStack, IconButton, Image, Stack, Text } from '@chakra-ui/react';
import { User } from '@prisma/client';
import useSharedState from 'hooks/useSharedState';
import fetcher from 'lib/fetch';
import { timeSince } from 'lib/utils';
import { useEffect, useState } from 'react';
import { CommentWithAuthor } from '../lib/prisma';
import Reply from './Reply';

const Comment = ({
  comment,
  onReply,
}: {
  comment: CommentWithAuthor;
  onReply: (comment: CommentWithAuthor, replyTo: User) => void;
}) => {
  const [user] = useSharedState<User | null>('user');
  const [isTruncated, setIsTruncated] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    setIsLiked(comment.likes?.some((l) => l.id === user?.id));
  }, [user]);

  console.log('comment', comment.replies);
  const onLike = async () => {
    setIsLiked(!isLiked);
    await fetcher(`api/clip/${comment.clipId}/comment/${isLiked ? 'dislike' : 'like'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        commentId: comment.id,
        userId: user.id,
      }),
    });
  };
  return (
    <>
      <HStack align="start">
        <Image src={comment.author.imageURL} boxSize="24px" objectFit="fill" borderRadius="50px" />
        <Flex flex="1 1 auto" direction="column">
          <Text fontSize="12px" fontWeight={700} letterSpacing="0.4px">
            {comment.author.username +
              (comment.author.username.includes('impostor') ? `_${comment.author.id - 5}` : '')}
          </Text>
          <Text
            fontSize="12px"
            letterSpacing="0.4px"
            color="#A19DAA"
            onClick={() => setIsTruncated(false)}
            noOfLines={isTruncated ? 2 : 0}
            whiteSpace="normal"
            wordBreak="break-word"
          >
            {comment.content}
          </Text>
          <HStack pt="8px">
            <Text fontSize="11px" color="#8C8797">
              {timeSince(comment.createdAt)}
            </Text>
            <Text fontSize="11px" fontWeight={700} cursor="pointer" onClick={() => onReply(comment, comment.author)}>
              Reply
            </Text>
          </HStack>
        </Flex>
        <Stack flex="0 0 auto" h="50px" align="center" py="4px" px="4px">
          <IconButton
            flex="1 0 auto"
            onClick={onLike}
            aria-label="like"
            variant="ghost"
            borderRadius="2px"
            icon={
              <Stack spacing="4px">
                <Image
                  w="18px"
                  src={`/assets/heart${isLiked ? '-full' : ''}.svg`}
                  sx={{ filter: isLiked ? 'drop-shadow(0px 2px 8px rgba(255, 255, 255, 0.4))' : '' }}
                />
                <Text color="#A19DAA" fontSize="12px" fontWeight="normal">
                  {comment.likes?.filter((u) => u.id !== user?.id).length + (isLiked ? 1 : 0)}
                </Text>
              </Stack>
            }
          />
        </Stack>
      </HStack>
      {comment.replies?.map((reply) => (
        <Reply key={reply.id} comment={comment} reply={reply} onReply={onReply} />
      ))}
    </>
  );
};

export default Comment;
