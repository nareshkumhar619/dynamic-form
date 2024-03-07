// formActions.js
export const addComponent = (component) => ({
  type: 'ADD_COMPONENT',
  payload: component,
});

export const editComponent = (index, component) => ({
  type: 'EDIT_COMPONENT',
  payload: { index, component },
});

export const toggleDisable = (index) => ({
  type: 'TOGGLE_DISABLE',
  payload: index,
});

export const deleteComponent = (index) => ({
  type: 'DELETE_COMPONENT',
  payload: index,
});

export const saveFormData = (formData) => ({
  type: 'SAVE_FORM_DATA',
  payload: formData,
});

export const resetComponents = () => ({
  type: 'RESET_COMPONENTS',
});
export const setComponents = (updatedComponents) => ({
  type: 'SET_COMPONENTS',  // Replace with your actual action type
  payload: updatedComponents,
});

export const editSavedFormData = (cardIndex, newData) => ({
  type: "EDIT_SAVED_FORM_DATA",
  payload: { cardIndex, newData },
});

export const deleteSavedFormData = (cardIndex) => ({
  type: "DELETE_SAVED_FORM_DATA",
  payload: { cardIndex },
});

export const addOption = (index) => ({
  type:"ADD_OPTION",
  payload: index,
});

export const removeOption = (index, optionIndex) => ({
  type: "REMOVE_OPTION",
  payload: { index, optionIndex },
});