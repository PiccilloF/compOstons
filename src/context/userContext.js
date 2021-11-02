/* eslint-disable arrow-parens */
import { useReducer, createContext } from 'react';

export const UserContext = createContext();

const initialState = {
  isLogged: false,
  id: '',
  userName: '',
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        id: action.payload.id,
        userName: action.payload.username,
        isLogged: true,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    default: return state;
  }
};

export const UserContextProvider = props => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};
