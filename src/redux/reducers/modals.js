const initialState = {
  isModalOpen: undefined,
  modalType: undefined,
  modalTitle: undefined,
  args: undefined,
};

const modals = (state = initialState, action) => {
  switch(action.type){
    case 'OPEN_MODAL':
      return {
        isModalOpen: true,
        modalType: action.modalType,
        modalTitle: action.modalTitle,
        args: action.args,
      };
    
    case 'CLOSE_MODAL':
      return {
        isModalOpen: false,
      };
    
    default:
      return state;
  }
}

export default modals;