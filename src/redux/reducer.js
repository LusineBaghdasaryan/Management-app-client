import * as actionTypes from './actionTypes'

const initialState = {
    clients: null,
    providers: [],
    singleClient: null,
    loading: false,
    error:null,
}

export const mainReducer = (store = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_LOADING:
            return {
                ...store,
                loading: action.payload,
                error: action.payload && null
            }
        case actionTypes.GET_CLIENTS:
            return {
                ...store,
                error: null,
                clients: action.payload,
                loading: false,
            }
     
        case actionTypes.ADD_CLIENT:
            return {
                ...store,
                error: null,
                clients: [ action.payload,...store.clients],
                loading: false,
            }
       
        case actionTypes.GET_CLIENT_BY_ID:
            return {
                ...store,
                singleClient: action.payload,
                loading: false,
                error: null
            }
       
        case actionTypes.UPDATE_CLIENT:
            const updatedClients = store.clients.filter(item => item._id !== action.payload._id);
            return {
                ...store,
                clients:updatedClients,
                loading: false,
                error: null
        
            }
        case actionTypes.DELETE_CLIENT:
            const filteredClients = store.clients.filter(item => item._id !== action.payload);
            return {
                ...store,
                loading: false,
                clients: filteredClients,
                error: null
                
            }
       
       
        case actionTypes.GET_PROVIDERS:
            return {
                ...store,
                providers: action.payload,
                loading: false,
                error: null
            }
        
        case actionTypes.ADD_PROVIDER:
            return {
                ...store,
                providers: [action.payload,...store.providers],
                loading: false,
                error: null
            }
            
        case actionTypes.DELETE_PROVIDER:
            const filteredProviders = store.providers.filter(item => item._id !== action.payload);
            return {
                ...store,
                loading: false,
                providers: filteredProviders,
                error: null
                
            }
            
        case actionTypes.UPDATE_PROVIDER:
            const updatedProviders = store.providers.filter(item => item.name !== action.payload.name);
            return {
                ...store,
                loading: false,
                providers: updatedProviders,
                error: null
        
            }
        case actionTypes.ERROR:
            return {
                ...store,
                loading: false,
                error: action.payload,
            }
       
        default:
            return store;
    }
}

