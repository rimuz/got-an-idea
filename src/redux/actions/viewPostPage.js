export const viewPostPageReset = postId => ({
  type: 'COMMENT_RESET', postId
});

export const viewPostPageSetBody = (body, postId) => ({
  type: 'SET_COMMENT_BODY', commentBody: body, postId,
});

export const viewPostPageSetReplyingTo = commentId => ({
  type: 'SET_REPLYING_TO', replyingTo: commentId
});