'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    AppRegistry, Image,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback
} from "react-native";
import {Colors} from "../../config/colors";

let ConvertRatio = 1.5;

export default class AddScreen extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    static propTypes = {
        title: PropTypes.string,
        events: PropTypes.array
    };

    moveToSexScreen() {
        this.context.router.history.push('/profile/sex');
    }

    render() {
        return (
            <View style={styles.blueBlock}>
                <Image source={require('../../../assets/common/babyBackground.png')} style={styles.babyBackground} resizeMode="repeat"/>
                <View style={styles.whiteBlock}>
                    <View style={styles.sparklesAndCompassBackground}>
                        <Image source={require('../../../assets/newProfile/addScreen/sparkles.png')} style={styles.sparkles}/>
                        <Image source={require('../../../assets/newProfile/addScreen/compass.png')} style={styles.compass}/>
                    </View>
                    <View style={styles.textBlock}>
                        <Text style={styles.heading}>Добро Пожаловать</Text>
                        <Text style={styles.description}>Для начала использования приложения вам необходимо добавить ребенка в систему.</Text>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.moveToSexScreen.bind(this)}>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonAndLabel}>
                            <View style={styles.addButton}>
                                <Image source={require('../../../assets/newProfile/addScreen/babyAdd.png')} style={{width: 49.5 * ConvertRatio, height: 38.5 * ConvertRatio}}/>
                            </View>
                            <Text style={styles.buttonLabel}>Добавить Ребенка</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    whiteBlock: {
        width: '100%',
        height: 268 * ConvertRatio,
        backgroundColor: "#ffffff"
    },
    textBlock: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -70*ConvertRatio
    },
    sparklesAndCompassBackground: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -30*ConvertRatio
    },
    blueBlock: {
        backgroundColor: Colors.darkSkyBlue,
        width: '100%',
        height: '100%',
    },
    babyBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    sparkles: {
        width: 207*ConvertRatio,
        height: 207*ConvertRatio
    },
    compass: {
        width: 40*ConvertRatio,
        height: 40*ConvertRatio,
        position: 'absolute'
    },
    heading: {
        width: 149.5*ConvertRatio,
        height: 54*ConvertRatio,
        fontFamily: "Roboto-Black",
        fontSize: 22.5*ConvertRatio,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#000000",
        marginBottom: 12.5*ConvertRatio
    },
    description: {
        width: 134*ConvertRatio,
        height: 33*ConvertRatio,
        fontFamily: "Roboto-Regular",
        fontSize: 7.5*ConvertRatio,
        fontWeight: "300",
        fontStyle: "normal",
        letterSpacing: -0.25*ConvertRatio,
        textAlign: "center",
        color: "#6a7178"
    },
    buttonContainer: {
        height: 91*ConvertRatio,
        zIndex: 100,
        marginTop: -37.5 * ConvertRatio
    },
    buttonAndLabel: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addButton: {
        width: 75*ConvertRatio,
        height: 75*ConvertRatio,
        backgroundColor: "#ffffff",
        borderStyle: "solid",
        borderWidth: 2.5*ConvertRatio,
        borderColor: Colors.darkSkyBlue,
        borderRadius: 37.5 * ConvertRatio,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonLabel: {
        width: 149.5*ConvertRatio,
        height: 8*ConvertRatio,
        fontFamily: "Roboto-Black",
        fontSize: 6.5*ConvertRatio,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#ffffff",
        marginTop: 8*ConvertRatio
    }
});

AppRegistry.registerComponent('AddScreen', () => AddScreen);