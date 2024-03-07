// redux/formReducer.js
const initialState = {
  components: [],
  formData: [],
};


const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COMPONENT':
      return {
        ...state,
        components: [...state.components, action.payload],
      };

    case 'EDIT_COMPONENT':
      const updatedComponents = [...state.components];
      updatedComponents[action.payload.index] = action.payload.component;
      return {
        ...state,
        components: updatedComponents,
      };

    case 'TOGGLE_DISABLE':
      const toggledComponents = state.components.map((component, index) =>
        index === action.payload ? { ...component, disabled: !component.disabled } : component
      );
      return {
        ...state,
        components: toggledComponents,
      };
    case 'DELETE_COMPONENT':
      const filteredComponents = state.components.filter((_, index) => index !== action.payload);
      return {
        ...state,
        components: filteredComponents,
      };
    case 'SAVE_FORM_DATA':
      return {
        ...state,
        formData: [...state.formData, action.payload],
      };
      case 'RESET_COMPONENTS':
      return {
        ...state,
        components: [],
      };
      case 'SET_COMPONENTS':
      return {
        ...state,
        form: {
          ...state.form,
          components: action.payload,
        },
      };
      case "EDIT_SAVED_FORM_DATA":
        return {
          ...state,
          formData: state.formData.map((data, index) =>
            index === action.payload.cardIndex ? action.payload.newData : data
          ),
        };
  
      case "DELETE_SAVED_FORM_DATA":
        return {
          ...state,
          formData: state.formData.filter((data, index) => index !== action.payload.cardIndex),
        };
    default:
      return state;
  }
};

export default formReducer;
