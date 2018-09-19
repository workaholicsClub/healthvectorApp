'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback
} from "react-native";
import {NextButton} from '../NextButton';
import ProfileQuestion from "./ProfileQuestion";
import LinearGradient from "react-native-linear-gradient";

let ConvertRatio = 2.1;

function range(start, stop) {
    let rangeElements = [];
    for (let current = start; current <= stop; current++) {
        rangeElements.push(current);
    }

    return rangeElements;
}

class Calendar extends Component {
    static propTypes = {
        year: PropTypes.number,
        monthIndex: PropTypes.number,
        onPress: PropTypes.func
    };

    setDate(newDate) {
        this.props.onPress(newDate);
    }

    render() {
        let monthStart = new Date(this.props.year, this.props.monthIndex, 1);
        let monthEnd = new Date(this.props.year, this.props.monthIndex+1, 1);
        monthEnd.setDate(monthEnd.getDate()-1);

        let monthStartDaySundayBased = monthStart.getDay();
        let monthStartDayMondayBased = monthStartDaySundayBased === 0 ? 6 : monthStartDaySundayBased - 1;
        let monthStartDay = monthStartDayMondayBased;
        let lastGapDay = monthStartDay;
        let isFirstWeekGapped = monthStartDay === 6;
        if (isFirstWeekGapped) {
            lastGapDay = 0;
        }

        let daysInMonth = monthEnd.getDate();

        let gapDays = range(0, lastGapDay-1);
        let monthDays = range(1, daysInMonth);

        return (
            <View style={styles.calendarContainer}>
                {gapDays.map((gapDay, index) => {
                    return <View style={styles.calendarDay} key={index} />;
                })}
                {monthDays.map((monthDay, index) => {
                    let dayNumber = index+1;
                    return (
                        <TouchableWithoutFeedback onPress={this.setDate.bind(this, dayNumber)} key={index}>
                            <View style={styles.calendarDay}>
                                <Text style={styles.calendarDayText}>{dayNumber}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                })}
            </View>
        );
    }
}

export default class BirthdayInput extends Component {
    static propTypes = {
        sex: PropTypes.string,
        name: PropTypes.string,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            sex: this.props.sex,
            name: this.props.name,
            selectedYear: false,
            selectedMonth: false,
            selectedDay: false
        };

        this.monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        this.years = ['2018', '2017', '2016', '2015', '2014', '2013', '2012'];
    }

    setYear(newYearIndex) {
        this.setState({selectedYear: parseInt(this.years[newYearIndex])});
    }

    setMonth(newMonthIndex) {
        this.setState({selectedMonth: newMonthIndex});
    }

    setDay(newDay) {
        this.setState({selectedDay: newDay});
        if (this.props.onChange) {
            let birthdayDate = new Date(this.state.selectedYear, this.state.selectedMonth, this.state.selectedDay);
            this.props.onChange(birthdayDate);
        }
    }

    render() {
        let isMale = this.state.sex === 'male';

        let questionText = isMale
            ? `Когда родился ${this.state.name}?`
            : `Когда родилась ${this.state.name}?`;

        let isYearSelected = this.state.selectedYear !== false;
        let isMonthSelected = this.state.selectedMonth !== false;
        let isDaySelected = this.state.selectedDay !== false;

        let showYearSelect = !isYearSelected;
        let showMonthSelect = isYearSelected && !isMonthSelected;
        let showYearOrMonthSelect = showYearSelect || showMonthSelect;
        let showCalendar = isYearSelected && isMonthSelected && !isDaySelected;
        let showGradient = !showCalendar;
        let isSelectionFinished = isYearSelected && isMonthSelected && isDaySelected;

        let buttons;
        let clickHandler;

        if (showYearSelect) {
            buttons = this.years;
            clickHandler = this.setYear;
        }

        if (showMonthSelect) {
            buttons = this.monthNames;
            clickHandler = this.setMonth;
        }

        let selectedMonthName;
        if (isMonthSelected) {
            selectedMonthName = this.monthNames[this.state.selectedMonth];
        }

        let selectedBlockCorners = styles.topRadius;
        if (isSelectionFinished) {
            selectedBlockCorners = styles.allRadius;
        }

        return (
            <View style={styles.pageContainer}>
                <View style={styles.whiteBackground}>
                    <ProfileQuestion showIcon={true} sex={this.state.sex} question={questionText} />
                </View>
                <View style={styles.selectedContainer}>
                    <View style={[styles.selectedYear, selectedBlockCorners]}>
                        {isYearSelected && (<Text style={styles.selectedYearText}>{this.state.selectedYear}</Text>)}
                        {isMonthSelected && (<Text style={[styles.selectedYearText, styles.topBorder]}>{selectedMonthName}</Text>)}
                        {isDaySelected && (<Text style={[styles.selectedYearText, styles.topBorder]}>{this.state.selectedDay}</Text>)}
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.buttonsContainer}>
                        {showYearOrMonthSelect && buttons.map((buttonText, index) => {
                            return (
                                <TouchableWithoutFeedback onPress={clickHandler.bind(this, index)} key={index}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>{buttonText}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        })}
                        {showCalendar && (<Calendar year={this.state.selectedYear} monthIndex={this.state.selectedMonth} onPress={this.setDay.bind(this)}/>)}
                    </View>
                </ScrollView>
                {/*showGradient &&
                    (
                        <LinearGradient colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]} start={{ x: 0.0, y: 0.5}} end={{ x: 0, y: 1.0 }} style={styles.whiteShadow}>
                        </LinearGradient>
                    )*/}
                {isSelectionFinished && (
                    <View style={styles.nextButtonContainer}>
                        <NextButton text="Далее" to="/profile/photo"/>
                    </View>)}
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
        width: "100%",
        alignItems: 'center'
    },
    buttonsContainer: {
        width: "100%",
        alignItems: 'center'
    },
    button: {
        width: 127.5 * ConvertRatio,
        height: 43.5 * ConvertRatio,
        borderRadius: 10.5 * ConvertRatio,
        backgroundColor: "#ffffff",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 2.5 * ConvertRatio
        },
        shadowRadius: 7.5 * ConvertRatio,
        shadowOpacity: 1,
        elevation: 7.5 * ConvertRatio,
        marginTop: 5 * ConvertRatio,
        marginBottom: 5 * ConvertRatio,
        textAlign: "center"
    },
    buttonText: {
        width: '100%',
        height: 43.5 * ConvertRatio,
        lineHeight: 43.5 * ConvertRatio,
        fontFamily: "Roboto-Black",
        fontSize: 12.5 * ConvertRatio,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#44c0ec"
    },
    nextButtonContainer: {
        position: 'absolute',
        bottom: 0,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginBottom: 12.5 * ConvertRatio
    },
    whiteShadow: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },
    selectedContainer: {
        width: '100%',
        alignItems: 'center'
    },
    topRadius: {
        borderTopLeftRadius: 10.5 * ConvertRatio,
        borderTopRightRadius: 10.5 * ConvertRatio
    },
    allRadius: {
        borderRadius: 10.5 * ConvertRatio
    },
    selectedYear: {
        width: 150 * ConvertRatio,
        alignItems: 'center',
        backgroundColor: "#ffffff",
        shadowColor: "rgba(0, 0, 0, 0.1)",
        shadowOffset: {
            width: 0,
            height: 2.5 * ConvertRatio
        },
        shadowRadius: 7.5 * ConvertRatio,
        shadowOpacity: 1,
        elevation:  7.5 * ConvertRatio
    },
    topBorder: {
        borderStyle: "solid",
        borderTopWidth: 0.5 * ConvertRatio,
        borderTopColor: "#e0e3e6"
    },
    selectedYearText: {
        width: '80%',
        height: 43.5 * ConvertRatio,
        lineHeight: 43.5 * ConvertRatio,
        fontFamily: "Roboto-Black",
        fontSize: 12.5 * ConvertRatio,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#000000"
    },
    calendarContainer: {
        paddingTop: 10 * ConvertRatio,
        width: 150 * ConvertRatio,
        height: 130 * ConvertRatio,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    calendarDay: {
        width: 21 * ConvertRatio,
        height: 18 * ConvertRatio
    },
    calendarDayText: {
        width: 21 * ConvertRatio,
        height: 18 * ConvertRatio,
        lineHeight: 18 * ConvertRatio,
        fontFamily: "Roboto-Black",
        fontSize: 9 * ConvertRatio,
        fontWeight: "bold",
        fontStyle: "normal",
        letterSpacing: 0,
        textAlign: "center",
        color: "#44c0ec"
    }
});

AppRegistry.registerComponent('BirthdayInput', () => BirthdayInput);