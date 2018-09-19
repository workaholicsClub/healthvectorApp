'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    AppRegistry,
    StyleSheet,
    View
} from "react-native";
import {NextButton} from '../NextButton';
import ProfileQuestion from "./ProfileQuestion";
import {WheelInput} from '../WheelInput';
import {ConvertRatio} from "../../config/settings";

export default class WheelPage extends Component {
    static propTypes = {
        sex: PropTypes.string,
        name: PropTypes.string,
        photo: PropTypes.object,
        items: PropTypes.array,
        type: PropTypes.string,
        next: PropTypes.string,
        onSet: PropTypes.func
    };

    questionText;
    items;
    units;

    constructor(props) {
        super(props);

        let isWeight = this.props.type === 'weight';
        this.questionText = isWeight
            ? `Какой у ${this.props.name} вес?`
            : `Какой у ${this.props.name} рост?`;

        this.items = this.props.items;

        this.units = isWeight
            ? 'кг'
            : 'см';
    }

    render() {
        return (
            <View style={styles.pageContainer}>
                <View style={styles.whiteBackground}>
                    <ProfileQuestion showIcon={true} sex={this.props.sex} imageSrc={this.props.photo} question={this.questionText} />
                    <WheelInput style={{marginTop: 15*ConvertRatio}} height={150} itemHeight={30} items={this.items} units={this.units} onSet={this.props.onSet}/>
                </View>
                <View style={styles.nextButtonContainer}>
                    <NextButton text="Далее" to={this.props.next}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        backgroundColor: "#ffffff",
        width: "100%",
        height: 272 * ConvertRatio,
        marginTop: 5 * ConvertRatio
    },
    whiteBackground: {
        alignItems: 'center'
    },
    nextButtonContainer: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginBottom: 12.5 * ConvertRatio
    }
});

AppRegistry.registerComponent('WheelPage', () => WheelPage);