import { Flex, HStack, IconButton, Image, Stack, Text } from '@chakra-ui/react';
import { User } from '@prisma/client';
import useSharedState from 'hooks/useSharedState';
import fetcher from 'lib/fetch';
import { timeSince } from 'lib/utils';
import { useEffect, useState } from 'react';
import { CommentWithAuthor } from '../lib/prisma';

const Comment = ({ comment }: { comment: CommentWithAuthor }) => {
  const [user] = useSharedState<User | null>('user');
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    setIsLiked(comment.likes?.some((l) => l.id === user?.id));
  }, [user]);

  const onLike = async () => {
    await fetcher(`api/clip/${comment.clipId}/comment/${isLiked ? 'dislike' : 'like'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        commentId: comment.id,
        userId: user.id,
      }),
    });
    setIsLiked(!isLiked);
  };
  return (
    <HStack align="start">
      <Image src={comment.author.imageURL} boxSize="24px" objectFit="fill" borderRadius="50px" />
      <Flex flex="1 1 auto" direction="column">
        <Text fontSize="12px" fontWeight={700} letterSpacing="0.4px">
          {comment.author.username + (comment.author.username.includes('impostor') ? `_${comment.author.id}` : '')}
        </Text>
        <Text fontSize="12px" letterSpacing="0.4px" color="#A19DAA" noOfLines={2} whiteSpace="normal">
          {comment.content}
        </Text>
        <HStack pt="8px">
          <Text fontSize="11px" color="#8C8797">
            {timeSince(comment.createdAt)}
          </Text>
          <Text fontSize="11px" fontWeight={700} cursor="not-allowed" textDecoration="line-through">
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
  );
};

export default Comment;