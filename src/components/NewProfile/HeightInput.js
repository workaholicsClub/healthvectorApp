'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    AppRegistry
} from "react-native";
import WheelPage from "./WheelPage";

export default class HeightInput extends Component {
    static propTypes = {
        sex: PropTypes.string,
        name: PropTypes.string,
        photo: PropTypes.object,
        items: PropTypes.array,
        next: PropTypes.string,
        onSet: PropTypes.func
    };

    render() {
        return <WheelPage type="height" {...this.props}/>
    }
}

AppRegistry.registerComponent('HeightInput', () => HeightInput);