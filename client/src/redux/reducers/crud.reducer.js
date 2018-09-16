import { crudConstants } from "../constants";

const rState = {
  post: {
    id: false,
    name: "",
    description: "",
    user: "",
    category: "",
    quantity: "",
    uid: false
  },
  articles: []
};

export function crudReducer(state = rState, action) {
  switch (action.type) {
    case crudConstants.ADD:
      return {
        ...state,
        post: rState.post,
        articles: [...state.articles, action.payload]
      };
    case crudConstants.GET:
      return { ...rState, ...state, articles: [...action.payload] };
    case crudConstants.DEL:
      const articles = state.articles.filter(
        item => item.id !== action.payload
      );
      return { ...state, articles: [...articles] };
    case crudConstants.EDIT:
      return { ...state, post: action.payload };
    case crudConstants.EDIT_ENTRY:
      const newArticles = state.articles.map(
        item => (item.id === action.payload.id ? action.payload : item)
      );
      return { ...state, post: rState.post, articles: [...newArticles] };
    case crudConstants.CLEAR_FORM:
      return { ...state, post: rState.post };
    default:
      return state;
  }
}
