import "babel-polyfill";

import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';

import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from '../constants';

import Routes from '../routes/Routes';

$.ajaxSetup({
    headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    },
    beforeSend: function(xhr, settings) {
        $.auth.appendAuthHeaders(xhr, settings);
    }
});

class Base extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        );
    }
}

ReactDOM.render(
    <Base />,
    document.getElementById('root')
);
