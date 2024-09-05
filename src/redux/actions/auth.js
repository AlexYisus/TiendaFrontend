import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  SET_AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REMOVE_AUTH_LOADING,
  USER_LOADED_FAIL,
  USER_LOADED_SUCCESS,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_FAIL,
  REFRESH_SUCCESS,
  LOGOUT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIL,
  RESET_LOGIN_FAIL,
} from "./types";

import axios from "axios";
// const token = "mysecret"; // Reemplaza con tu token
const token = localStorage.getItem("access");

export const check_authenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      token: localStorage.getItem("access"),
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
        body,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const signup = (first_name, last_name, email, password, re_password) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true, // Opcional, solo si necesitas enviar cookies
  };

  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    password,
    re_password,
  });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/`,
      body,
      config
    );

    if (res.status === 201) {
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: SIGNUP_FAIL,
      });
    }
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
    return res;
  } catch (err) {
    console.log("err:", err.response.data); // Esto te dará más información sobre qué está causando el error
    dispatch({
      type: SIGNUP_FAIL,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
    return err.response.data;
  }
};

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`,
        config
      );

      if (res.status === 200) {
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: USER_LOADED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // Opcional, solo si necesitas enviar cookies
  };

  const body = JSON.stringify({
    email,
    password,
  });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    );
    if (res.status === 200) {
      const { access, refresh } = res.data;

      // Almacena los tokens en el localStorage
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: RESET_LOGIN_FAIL,
      });
      dispatch(load_user());
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
      return res;
    } else {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      dispatch({
        type: LOGIN_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
    return err.response.data;
  }
};

export const activate = (uid, token) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    uid,
    token,
  });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
      body,
      config
    );

    if (res.status === 204) {
      dispatch({
        type: ACTIVATION_SUCCESS,
      });
    } else {
      dispatch({
        type: ACTIVATION_FAIL,
      });
    }
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  }
};

export const refresh = () => async (dispatch) => {
  if (localStorage.getItem("refresh")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true, // Opcional, solo si necesitas enviar cookies
    };

    const body = JSON.stringify({
      refresh: localStorage.getItem("refresh"),
    });

    console.log("Refresh token:", body);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`,
        body,
        config
      );
      console.log("Response Refresh token:", res.data);

      if (res.status === 200) {
        dispatch({
          type: REFRESH_SUCCESS,
          payload: res.data,
        });
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
      } else {
        dispatch({
          type: REFRESH_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: REFRESH_FAIL,
      });
    }
  } else {
    dispatch({
      type: REFRESH_FAIL,
    });
  }
};

export const reset_password = (email) => async (dispatch) => {
  dispatch({
    type: SET_AUTH_LOADING,
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
      body,
      config
    );

    if (res.status === 204) {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    } else {
      dispatch({
        type: RESET_PASSWORD_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    }
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
    });
    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  }
};

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    dispatch({
      type: SET_AUTH_LOADING,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({
      uid,
      token,
      new_password,
      re_new_password,
    });

    if (new_password !== re_new_password) {
      dispatch({
        type: RESET_PASSWORD_CONFIRM_FAIL,
      });
      dispatch({
        type: REMOVE_AUTH_LOADING,
      });
    } else {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
          body,
          config
        );

        if (res.status === 204) {
          dispatch({
            type: RESET_PASSWORD_CONFIRM_SUCCESS,
          });
          dispatch({
            type: REMOVE_AUTH_LOADING,
          });
        } else {
          dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL,
          });
          dispatch({
            type: REMOVE_AUTH_LOADING,
          });
        }
      } catch (err) {
        dispatch({
          type: RESET_PASSWORD_CONFIRM_FAIL,
        });
        dispatch({
          type: REMOVE_AUTH_LOADING,
        });
      }
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
