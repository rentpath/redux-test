export default function todoReducer(state = [], action) {
  switch(action.type) {
    case 'CREATE_TODO':
      return [...state, action.text];
    case 'EDIT_TODO':
      return [...state.slice(0, action.id), action.text, ...state.slice(action.id+1)];
    case 'DELETE_TODO':
      return [...state.slice(0, action.id), ...state.slice(action.id+1)];
    default:
      return state;
  }
}
