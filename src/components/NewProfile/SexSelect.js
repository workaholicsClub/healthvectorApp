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
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from "../../config/colors";
import NextButton from "../NextButton/NextButton";

let ConvertRatio = 2.1;

export default class SexSelect extends Component {
    static propTypes = {
        sex: PropTypes.string,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            sex: this.props.sex
        };
    }

    toggleSex(newSex) {
        this.setState({'sex': newSex});
        if (this.props.onChange) {
            this.props.onChange(newSex);
        }
    };

    render() {
        let isMale = this.state.sex === 'male';

        return (
            <View style={styles.whiteBackground}>
                <Image source={require('../../../assets/common/babyBackground.png')} style={styles.babyBackground} resizeMode="repeat"/>
                <LinearGradient colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]} start={{ x: 0.0, y: 0}} end={{ x: 0, y: 0.5 }} style={styles.babyBackground}>
                    <View style={styles.pageContainer}>
                        <Text style={styles.headingText}>
                            Выберите пол{"\n"}
                            ребенка
                        </Text>
                        <View style={styles.buttonsContainer}>
                            <TouchableWithoutFeedback style={styles.touchable} onPress={this.toggleSex.bind(this, 'male')}>
                                <View style={isMale ? styles.activeButton : styles.inactiveButton}>
                                    <Image source={require('../../../assets/newProfile/sexScreen/male.png')} style={{
                                        width: 50 * ConvertRatio,
                                        height: 41.3 * ConvertRatio
                                    }}/>
                                    <Text style={styles.buttonText}>
                                        Мальчик
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback style={styles.touchable} onPress={this.toggleSex.bind(this, 'female')}>
                                <View style={isMale ? styles.inactiveButton : styles.activeButton}>
                                    <Image source={require('../../../assets/newProfile/sexScreen/female.png')} style={{
                                        width: 50 * ConvertRatio,
                                        height: 44.3 * ConvertRatio
                                    }}/>
                                    <Text style={styles.buttonText}>
                                        Девочка
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.nextButtonContainer}>
                            <NextButton text="Далее" to="/profile/name"/>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headingText: {
        width: 130 * ConvertRatio,
        height: 30 * ConvertRatio,
        fontFamily: "Roboto-Black",
        fontSize: 10 * ConvertRatio,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 15 * ConvertRatio,
        letterSpacing: 0,
        textAlign: "center",
        color: "#000000",
        marginTop: 33 * ConvertRatio
    },
    buttonText: {
        width: 72.5 * ConvertRatio,
        height: 11 * ConvertRatio,
        fontFamily: "Roboto-Regular",
        fontSize: 7.5 * ConvertRatio,
        fontWeight: "300",
        fontStyle: "normal",
        letterSpacing: -0.25 * ConvertRatio,
        textAlign: "center",
        color: "#6a7178",
        marginTop: 6.7 * ConvertRatio
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        width: 158 * ConvertRatio,
        height: 107 * ConvertRatio,
        marginTop: 33 * ConvertRatio
    },
    touchable: {
        width: 72.5 * ConvertRatio,
        height: 87 * ConvertRatio,

        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 1 * ConvertRatio,
            height: 2.5 * ConvertRatio
        },
        shadowRadius: 7.5 * ConvertRatio,
        shadowOpacity: 1,

        flex: 1,
        flexDirection: 'column'
    },
    activeButton: {
        width: 72.5 * ConvertRatio,
        height: 87 * ConvertRatio,
        borderRadius: 10.5 * ConvertRatio,
        backgroundColor: '#ffffff',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8.5 * ConvertRatio,
        borderStyle: "solid",
        borderWidth: 2.5 * ConvertRatio,
        borderColor: Colors.darkSkyBlue,
        elevation: 8.5 * ConvertRatio,

        opacity: 1
    },
    inactiveButton: {
        width: 72.5 * ConvertRatio,
        height: 87 * ConvertRatio,
        borderRadius: 10.5 * ConvertRatio,
        backgroundColor: '#ffffff',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        opacity: 0.3
    },
    whiteBackground: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff'
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
    nextButtonContainer: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginBottom: 12.5 * ConvertRatio
    }
});

AppRegistry.registerComponent('SexSelect', () => SexSelect);