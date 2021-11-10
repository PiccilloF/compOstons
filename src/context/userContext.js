/* eslint-disable arrow-parens */
import { useReducer, createContext } from 'react';

export const UserContext = createContext();

const initialState = {
  isLogged: false,
  id: 0,
  username: '',
  mail: '',
  firstname: '',
  lastname: '',
  address: '',
  category: '',
  role: '',
  image: '',
  created_at: '',
  updated_at: '',
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLogged: true,
        ...action.payload,
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
