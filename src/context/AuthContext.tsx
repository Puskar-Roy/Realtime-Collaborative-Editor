import { createContext, useReducer, useEffect } from "react";

import {
  State,
  Action,
  AuthContextProviderProps,
  User,
} from "../interfaces/ContextInterface";

const initialState: State = {
  user: null,
};

export const AuthContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      const newState= { ...state, user: action.payload as User };
      console.log("NewState", newState);
      return newState;
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

function getOauthToken(cookieName: string) {
  // Add cookie name prefix
  const cookieNamePrefix = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);

  // Split cookie string into individual name-value pairs
  const cookiePairs = decodedCookie.split(";");

  for (let i = 0; i < cookiePairs.length; i++) {
    let cookiePair = cookiePairs[i];
    // Trim leading whitespace
    while (cookiePair.charAt(0) === " ") {
      cookiePair = cookiePair.substring(1);
    }
    // Check if cookie name matches
    if (cookiePair.indexOf(cookieNamePrefix) === 0) {
      // Extract token value
      return (cookiePair.substring(cookieNamePrefix.length));
    }
  }
  return null;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    const userString = localStorage.getItem("user");
    // check for oauthToken cookie in the browser
    const oauthTokenString = getOauthToken("oauthToken");
    console.log("oauthToken : ", JSON.parse(oauthTokenString as string));
    if (oauthTokenString) {
      const oauthToken = JSON.parse(oauthTokenString);
      dispatch({ type: "LOGIN", payload: oauthToken });
    }
    else if (userString) {
      const user: User = JSON.parse(userString);
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  useEffect(() => {
    const saveUser = () => {
      console.log("Saving user to local storage");
      localStorage.setItem("user", JSON.stringify(state.user));
    };

    saveUser();
  }, [state.user]);

  console.log("Auth Context State : ", state);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
