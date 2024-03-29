import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

//provider is used to provide the store value to all the components
const jsx = (
    <Provider store={store}>      
        <AppRouter />
    </Provider>
);

let hasRendered = false;
const renderApp = (hasRendered) => {
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

//when the user logs in or log out the function will execute
firebase.auth().onAuthStateChanged((user) => {
    if(user){
        console.log('log-in');
        store.dispatch(login(user.uid));
        renderApp();
            if(history.location.pathname === '/') {
                history.push('/dashboard');
            };
    }else{
        console.log('log-out');
        store.dispatch(logout());
        renderApp();
        history.push('/');
        
    }
});