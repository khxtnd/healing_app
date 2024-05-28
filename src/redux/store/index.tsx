import { legacy_createStore as createStore } from 'redux';
import allReducers from '../reducers/AllReducers';

export const storeRedux = createStore(allReducers);
