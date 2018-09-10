import { categoryConstants } from "../constants";

const rState = {
  category: {
    id: false,
    name: "",
  },
  categories: []
};

export function category(state = rState, action) {
  switch (action.type) {
    case categoryConstants.ADD_REQUEST:
      return {
        loading: true
      };
    case categoryConstants.ADD:
      return {
        ...state,
        category: rState.category,
        categories: [...state.categories, action.payload]
      };
    case categoryConstants.GET:
      console.log(action.payload);
      return { ...rState, ...state, categories: [...action.payload] };
    case categoryConstants.DEL:
      const categories = state.categories.filter(
        item => item.id !== action.payload
      );
      return { ...state, categories: [...categories] };
    case categoryConstants.EDIT:
      const newArticles = state.categories.map(
        item => (item.id === action.payload.id ? action.payload : item)
      );
      return { ...state, category: rState.category, categories: [...newArticles] };
    case categoryConstants.CLEAR:
      return { ...state, category: rState.category};
    case categoryConstants.EDITSHOW:
      return { ...state, category: {id: action.payload.id, name: action.payload.category }};
    default:
      return state;
  }
}
