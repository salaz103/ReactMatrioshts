import {createStore, combineReducers} from 'redux';
import codigoReducer from '../reducers/codigoReducer';

export default ()=>{
    const store=createStore(
        combineReducers({
            codigo:codigoReducer
        })
    );

    return store;
};

