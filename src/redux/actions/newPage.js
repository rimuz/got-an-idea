/*
 *  Copyright 2019 Riccardo Musso
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
*/

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

export const newPageSetInspiredBy = inspiredBy => ({
  type: 'SET_INSPIRED_BY',
  inspiredBy,
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

export const newPageSetMaxStage = maxStage => ({
  type: 'SET_MAX_STAGE',
  maxStage
});

export const newPageSetEditing = editing => ({
  type: 'SET_EDITING',
  editing
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