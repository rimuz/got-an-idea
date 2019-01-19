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
};

function newPage(state = initialState, action){  
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
    
    case 'SET_TITLE':
      return {
        ...state,
        title: action.title,
      }
    
    case 'SET_BODY':
      return {
        ...state,
        body: action.body,
      }

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