const initialState = {
  commentBody: { text: '' },
  replyingTo: undefined,
  commentTo: undefined,
};

function viewPostPage(state = initialState, action){
  switch(action.type){
    case 'SET_COMMENT_BODY':
      return {
        ...state,
        commentBody: action.commentBody,
        commentTo: action.postId,
      };

    case 'SET_REPLYING_TO':
      return {
        ...state,
        replyingTo: action.replyingTo,
      };

    case 'COMMENT_RESET':
      return {
        ...initialState,
        commentTo: action.postId
      };

    default:
      return state;
  }
}

export default viewPostPage;