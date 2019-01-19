export const openModal = (modalType, modalTitle, args) => ({
  type: 'OPEN_MODAL',
  modalType, modalTitle, args
});

export const closeModal = () => ({
  type: 'CLOSE_MODAL',
});