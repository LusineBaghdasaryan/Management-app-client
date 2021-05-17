import * as actionTypes from './actionTypes';
import {axiosRequest} from '../utils/axiosRequest.util'


//----------- URL -----------
const apiUrl = 'http://localhost:5000/api';


//--------- Change loading -----------
const changeLoader = (bool) => (
        {
            type: actionTypes.CHANGE_LOADING,
            payload: bool,
        });



//--------- Client actions -----------

export function getClients() {
    let url = `${apiUrl}/clients`;
    return async (dispatch) => {
        try {
            dispatch(changeLoader(true));
            const data = await axiosRequest(url, 'get');
            dispatch(({type: actionTypes.GET_CLIENTS, payload: data.body}));
            dispatch(changeLoader(false));
        } catch (err) {
            dispatch(({type: actionTypes.ERROR, payload: err.response.data.errorMessage || err}));
        }
    }
}


export function getClientById(clientId) {
    let url = `${apiUrl}/client/${clientId}`;
    return async (dispatch) => {
        dispatch(changeLoader(true));
        try {
            const data = await axiosRequest(url, 'get');
            dispatch(({type: actionTypes.GET_CLIENT_BY_ID, payload: data.body}));
            dispatch(changeLoader(false));
        } catch (err) {
            dispatch(({type: actionTypes.ERROR, payload: err.response.data.errorMessage || err}));
        }
    }
}


export function addClient(clientData) {
    let url = `${apiUrl}/client`;
    return async (dispatch) => {
        dispatch(changeLoader(true));
       if (!clientData.providers){
            clientData.providers=[]
        }
        try {
            const data = await axiosRequest(url, 'post',{...clientData});
            dispatch(({type: actionTypes.ADD_CLIENT, payload: data.body}));
            dispatch(({type: actionTypes.GET_CLIENT_BY_ID, payload: null}));
            dispatch(changeLoader(false));
        } catch (err) {
            dispatch(({type: actionTypes.ERROR, payload: err.response.data.errorMessage || err}));
        }
    }
}


export function updateClient(clientData, clientId) {
    let url = `${apiUrl}/client/${clientId}`;
    return async (dispatch) => {
        dispatch(changeLoader(true));
        if (!clientData.providers){
            clientData.providers=[]
        }
        try {
            const data = await axiosRequest(url, 'put',{...clientData});
            dispatch(({type: actionTypes.UPDATE_CLIENT, payload: data.body}));
            dispatch(({type: actionTypes.GET_CLIENT_BY_ID, payload: null}));
            dispatch(changeLoader(false));
        } catch (err) {
            dispatch(({type: actionTypes.ERROR, payload: err.response.data.errorMessage || err}));
        }
    }
}


export function deleteClient(clientId) {
    let url = `${apiUrl}/client/${clientId}`;
    return async (dispatch) => {
        dispatch(changeLoader(true));
        try {
            const data = await axiosRequest(url, 'delete');
            dispatch(({type: actionTypes.DELETE_CLIENT, payload: clientId}));
            !data.hasError && dispatch(getClients());
            dispatch(changeLoader(false));
        } catch (err) {
            dispatch(({type: actionTypes.ERROR, payload: err.response.data.errorMessage || err}));
        }
    }
}


//--------- Provider actions -----------

export function getProviders() {
    let url = `${apiUrl}/providers`;
    return async (dispatch) => {
        dispatch(changeLoader(true));
        try {
            const data = await axiosRequest(url, 'get');
            dispatch(({type: actionTypes.GET_PROVIDERS, payload: data.body}));
            dispatch(changeLoader(false));
        } catch (err) {
            dispatch(({type: actionTypes.ERROR, payload: err.response.data.errorMessage || err}));
        }
    }
}


export function addProvider(provName) {
    let url = `${apiUrl}/provider`;
    return async (dispatch) => {
        dispatch(changeLoader(true));
        try {
            const data = await axiosRequest(url, 'post',{name: provName});
            dispatch(({type: actionTypes.ADD_PROVIDER, payload: data.body}));
            dispatch(changeLoader(false));
        } catch (err) {
            dispatch(({type: actionTypes.ERROR, payload: err.response.data.errorMessage || err}));
        }
    }
}


export function updateProvider(provName, providerId) {
    let url = `${apiUrl}/provider/${providerId}`;
    return async (dispatch) => {
        dispatch(changeLoader(true));
        try {
            const data = await axiosRequest(url, 'put',{name: provName});
            dispatch(({type: actionTypes.UPDATE_PROVIDER, payload: data.body}));
            !data.hasError && dispatch(getProviders());
            dispatch(changeLoader(false));
        } catch (err) {
            dispatch(({type: actionTypes.ERROR, payload: err.response.data.errorMessage || err}));
        }
    }
}



export function deleteProvider(providerId) {
    let url = `${apiUrl}/provider/${providerId}`;
    return async (dispatch) => {
        dispatch(changeLoader(true));
        try {
            await axiosRequest(url, 'delete');
            dispatch(({type: actionTypes.DELETE_PROVIDER, payload: providerId}));
            dispatch(changeLoader(false));
        } catch (err) {
            dispatch(({type: actionTypes.ERROR, payload: err.response.data.errorMessage || err}));
        }
    }
}
