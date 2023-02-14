import {hookstate, useHookstate} from '@hookstate/core';
import {LoginResponse} from '../models/ApiModels';

export interface UserSession {
  isLoggedIn: boolean;
  token: string | null;
  user: LoginResponse | null;
}

const initialGlobalState = hookstate({
  isLoggedIn: false,
  token: null,
  user: null,
});

export const useGlobalSessionState = () => {
  const currentUserSession = useHookstate(initialGlobalState);
  return {
    getUserSession: () => currentUserSession.value,
    setUserSession: (session: any) => {
      currentUserSession.set(session);
    },
  };
};
