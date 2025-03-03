import { createContext, useEffect, useReducer } from "react";

import { atomicConfig } from "../config";
import { isValidToken, setSession } from "../utils/jwt";
import { call_api, call_api_auth } from "../utils/services";

const INITIALIZE = "INITIALIZE";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";
const SIGN_UP = "SIGN_UP";

const LOGIN_ENDPOINT = "/login";
const SIGNUP_ENDPOINT = "/signup";
const PROFILE_ENDPOINT = "/protected";
const RESET_PASSWORD_EMAIL = "/reset-password-email";
const RESET_PASSWORD_ENDPOINT = "/reset-password/";
const CHECK_PASSWORD_RESET_STATUS_ENDPOINT = "/check-reset-password-status/";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          let response = await call_api_auth(
            atomicConfig.userServiceUrl + PROFILE_ENDPOINT,
            "GET"
          );

          const { user } = response.data;

          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const signIn = async (email, password) => {
    try {
      let response = await call_api(
        atomicConfig.userServiceUrl + LOGIN_ENDPOINT,
        "POST",
        {
          email: email,
          password: password,
        }
      );
      const { accessToken, user } = response.data;

      setSession(accessToken);
      dispatch({
        type: SIGN_IN,
        payload: {
          user: user,
        },
      });
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: SIGN_IN,
        payload: {
          user: null,
        },
      });
      throw new Error(error.response.data.Message);
    }
  };

  const signOut = async () => {
    setSession(null);
    dispatch({ type: SIGN_OUT });
  };

  const signUp = async (email, password, firstName, lastName) => {
    try {
      const response = await call_api(
        atomicConfig.userServiceUrl + SIGNUP_ENDPOINT,
        "POST",
        {
          email,
          password,
          firstName,
          lastName,
        }
      );
      const { accessToken, user } = response.data;

      window.localStorage.setItem("accessToken", accessToken);
      dispatch({
        type: SIGN_UP,
        payload: {
          user: user,
        },
      });
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: SIGN_UP,
        payload: {
          user: null,
        },
      });

      throw new Error(error.response.data.Message);
    }
  };

  const resetPassword = async (email) => {
    try {
      const response = await call_api(
        atomicConfig.userServiceUrl + RESET_PASSWORD_EMAIL,
        "POST",
        {
          email: email,
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.response.data.Message);
    }
  };

  const checkResetStatus = async (user_id, timestamp) => {
    try {
      const response = await call_api(
        atomicConfig.userServiceUrl +
          CHECK_PASSWORD_RESET_STATUS_ENDPOINT +
          user_id +
          "/" +
          timestamp,
        "GET"
      );
      return response;
    } catch (error) {
      throw new Error(error.response.data.Message);
    }
  };

  const newPassword = async (data) => {
    try {
      const response = await call_api(
        atomicConfig.userServiceUrl + RESET_PASSWORD_ENDPOINT + data.id,
        "POST",
        {
          password: data.password,
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.response.data.Message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        signIn,
        signOut,
        signUp,
        resetPassword,
        checkResetStatus,
        newPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
