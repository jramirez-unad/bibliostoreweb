import { createStore, combineReducers, compose  } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

/** Custom Reducers */
import buscarUsuarioReducer from './reducers/buscarUsuarioReducer';

// Configurar firestore.
const firebaseConfig = {
    apiKey: "AIzaSyDWCMKSo2AO1wvymlyXUURDwEfbnO252Qs",
    authDomain: "biblio-store-47065.firebaseapp.com",
    databaseURL: "https://biblio-store-47065.firebaseio.com",
    projectId: "biblio-store-47065",
    storageBucket: "biblio-store-47065.appspot.com",
    messagingSenderId: "151029600714",
    appId: "1:151029600714:web:f0bb91bfb0f4a9ffdc3f33"
}

// inicializar firebase
firebase.initializeApp(firebaseConfig);

// configuracion de react-redux
const rrfConfig = {
    userProfile : 'users',
    useFirestoreForProfile: true,
    enableLogging: false
}

// crear el enhacer con compose de redux y firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// Reducers 
const rootReducer = combineReducers({
    firebase : firebaseReducer,
    firestore: firestoreReducer, 
    usuario : buscarUsuarioReducer
})

// state inicial
const initialState = {};

// Create el store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
export default store;