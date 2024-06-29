import React, { createContext, useState, useContext, Dispatch } from 'react';
import { User } from '@repo/types';

type State = { currentUser: User | null };
const StateContext = createContext<State | null>(null);
const DispatchContext = createContext<Dispatch<State> | null>(null);

const UserProvider = ({
  userState: _userState,
  children,
}: {
  userState: State;
  children: React.ReactNode;
}) => {
  const [userState, setUserState] = useState<State>(_userState);
  return (
    <StateContext.Provider value={userState}>
      <DispatchContext.Provider value={setUserState}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export const useUserState = () => {
  const state = useContext(StateContext);
  if (!state) throw new Error('not wrapped with UserProvider');
  return state;
};

export const useUserDispatch = () => {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) throw new Error('not wrapped with UserProvider');
  return dispatch;
};

export default UserProvider;
