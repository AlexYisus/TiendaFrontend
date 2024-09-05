import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL,
    LOGOUT,
    RESET_LOGIN_FAIL
} from '../actions/types'

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    loading: false,
    loginFail: false,  // Inicialmente en false
    error: ""
}

export default function Auth(state = initialState, action) {
    const { type, payload } = action;
    // console.log("payload:", payload)
    // console.log("type:", type)

    switch (type) {
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: true
            }
        case REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: false
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);
            return {
                ...state,
                loginFail: false, // Cambiar a false en el éxito del login
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh,
                user: payload.user || null, // Asegúrate de que el usuario también se cargue correctamente
                loading: false
            };

        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
        case RESET_PASSWORD_SUCCESS:
        case RESET_PASSWORD_FAIL:
        case RESET_PASSWORD_CONFIRM_SUCCESS:
        case RESET_PASSWORD_CONFIRM_FAIL:
            return {
                ...state
            }

        case REFRESH_SUCCESS:
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                access: localStorage.getItem('access')
            }
        case SIGNUP_SUCCESS:
            return {
                error: payload?.data || 'Registro exitoso',
            }
        case SIGNUP_FAIL:
        case REFRESH_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                error: payload?.response?.data || 'Error al iniciar sesión',
                loginFail: true,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
            }
        case RESET_LOGIN_FAIL:
            return {
                ...state,
                loginFail: false,
            };
        default:
            return state
    }
}