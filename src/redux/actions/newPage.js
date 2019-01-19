export const newPageSetPostType = postType => ({
  type: 'SET_POST_TYPE',
  postType,
});

export const newPageSetPostStage = postStage => ({
  type: 'SET_POST_STAGE',
  postStage,
});

export const newPageSetTitle = title => ({
  type: 'SET_TITLE',
  title,
});

export const newPageSetBody = body => ({
  type: 'SET_BODY',
  body,
});

export const newPageNext = () => ({
  type: 'NEXT',
});

export const newPageReset = () => ({
  type: 'RESET'
});

export const newPageSetStage = stage => ({
  type: 'SET_STAGE',
  stage
});

export const newPageAddTag = tag => ({
  type: 'ADD_TAG',
  tag
});

export const newPageRemoveTag = tag => ({
  type: 'REMOVE_TAG',
  tag 
});

export const newPageResetStage = () => ({
  type: 'RESET_STAGE'
});