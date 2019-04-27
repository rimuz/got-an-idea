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
  stage: 0,         // current displayed page (0: select type, 1: select tags, etc.)
  maxStage: 0,      // the furthest point 'forward' button can reach

  /*
    postStage:
      - IDEAS:
        . intuition
        . concept
        . plan
        . ready
        . old

      - PROJECTS:
        . intuition
        . working
        . MVP
        . beta
        . production
        . dropped
  */
  postStage: undefined,
  postType: undefined,  // "idea|project"
  postTags: [],  // tag names without #

  title: "",
  body: { text: '' },
  inspiredBy: "",
  editing: undefined,
};

function newPage(state = initialState, action){  
  console.log("Dispatch!!");
  console.log({action});

  switch(action.type){
    case 'NEXT':
      return {
        ...state,
        stage: state.stage+1,
        maxStage: state.stage+1,
      };

    case 'SET_POST_STAGE':
      return {
        ...state,
        postStage: action.postStage,
      };

    case 'SET_POST_TYPE':
      const postStage = action.postType !== state.postType ? 'intuition' : state.postStage;

      return {
        ...state,
        postType: action.postType,
        postStage,
      };
    
    case 'SET_STAGE':
      return {
        ...state,
        stage: action.stage,
      };
    
    case 'SET_MAX_STAGE':
      return {
        ...state,
        maxStage: action.maxStage,
      };
    
    case 'SET_TITLE':
      return {
        ...state,
        title: action.title,
      };
    
    case 'SET_BODY':
      return {
        ...state,
        body: action.body,
      };
    
    case 'SET_INSPIRED_BY':
      return {
        ...state,
        inspiredBy: action.inspiredBy,
      };
    
    case 'SET_EDITING':
      return {
        ...state,
        editing: action.editing,
      };

    case 'ADD_TAG':
      return {
        ...state,
        postTags: [
          ...state.postTags, action.tag
        ]
      };

    case 'REMOVE_TAG':
      const { postTags } = state;
      const idx = postTags.indexOf(action.tag);
      const newTags = [
        ...postTags.slice(0, idx),
        ...postTags.slice(idx + 1)
      ];

      return {
        ...state,
        postTags: newTags
      };

    case 'RESET_STAGE':
      return {
        ...state,
        postStage: undefined,
      }

    case 'RESET':
      return initialState;
    
    default:
      return state;
  }
}

export default newPage;