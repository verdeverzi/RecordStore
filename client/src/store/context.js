import { useReducer, useEffect, createContext, useState } from 'react';

import { recordsInitialState, recordsReducer } from './reducers/recordsReducer';
import { cartsInitialState, cartsReducer } from './reducers/cartsReducer';
import { usersInitialState, usersReducer } from './reducers/usersReducer';

import getAllRecords from '../apiCalls/recordsApiCalls';
import { getCartItems } from '../apiCalls/cartsApiCalls';

import { getUser } from '../apiCalls/usersApiCalls';

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //! Record State
  const [recordsState, recordsDispatch] = useReducer(
    recordsReducer,
    recordsInitialState
  );

  //! Cart State
  const [cartsState, cartsDispatch] = useReducer(
    cartsReducer,
    cartsInitialState
  );

  //! User State
  const [usersState, usersDispatch] = useReducer(
    usersReducer,
    usersInitialState
  );

  useEffect(() => {
    getUser(usersDispatch);
    getAllRecords(recordsDispatch);
    getCartItems(cartsDispatch);
  }, []);

  const { data } = recordsState;
  const { user, isUserLoggedIn } = usersState;

  return (
    <DataContext.Provider
      value={{
        data,
        cartsDispatch,
        cartsState,
        user,
        isUserLoggedIn,
        usersDispatch,
        error,
        loading,
        setError,
        setLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
