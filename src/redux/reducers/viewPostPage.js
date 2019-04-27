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