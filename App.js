import React, {Component} from 'react';

import {Dashboard} from "./src/components/Dashboard";
import {NewProfile} from "./src/components/NewProfile";
import SexSelect from "./src/components/NewProfile/SexSelect";
import NameInput from "./src/components/NewProfile/NameInput";
import BirthdayInput from "./src/components/NewProfile/BirthdayInput";
import PhotoInput from "./src/components/NewProfile/PhotoInput";
import HeightInput from "./src/components/NewProfile/HeightInput";
import WeightInput from "./src/components/NewProfile/WeightInput";
import { NativeRouter, Route, Switch } from 'react-router-native'
import PropTypes from "prop-types";

type Props = {};

function stringSeq(from, to, step) {
    let seq = [];
    for (let index = from; index >= to; index = index - step) {
        let indexString = step < 1
            ? index.toFixed(1)
            : index.toString();

        seq.push(indexString);
    }

    return seq;
}

export default class App extends Component<Props> {
    static propTypes = {
        sex: PropTypes.string,
        name: PropTypes.string,
        birthday: PropTypes.instanceOf(Date),
        photo: PropTypes.object,
        weight: PropTypes.number,
        height: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {
            sex: 'male'
        };
    }

    changeSex(newSex) {
        this.setState({'sex': newSex});
    }

    changeName(newName) {
        this.setState({'name': newName});
    }

    changeBirthday(newBirthday) {
        this.setState({'birthday': newBirthday});
    }

    changePhoto(newPhoto) {
        this.setState({'photo': newPhoto});
    }

    changeWeight(newWeight) {
        this.setState({'weight': newWeight});
    }

    changeHeight(newHeight) {
        this.setState({'height': newHeight});
    }

    render() {
        return (
            <NativeRouter>
                <Switch>
                    <Route exact path="/" component={NewProfile}/>
                    <Route path="/profile/sex" render={() => <SexSelect sex={this.state.sex} onChange={this.changeSex.bind(this)}/>} />
                    <Route path="/profile/name" render={() => <NameInput sex={this.state.sex} name={this.state.name} onChange={this.changeName.bind(this)}/>} />
                    <Route path="/profile/birthday" render={() => <BirthdayInput sex={this.state.sex} name={this.state.name} onChange={this.changeBirthday.bind(this)}/>} />
                    <Route path="/profile/photo" render={() => <PhotoInput sex={this.state.sex} onChange={this.changePhoto.bind(this)}/>} />
                    <Route path="/profile/height" render={() => (
                        <HeightInput
                            sex={this.state.sex}
                            name={this.state.name}
                            items={stringSeq(65, 35, 1)}
                            photo={this.state.photo}
                            next="/profile/weight"
                            onChange={this.changeHeight.bind(this)} />
                    )}/>
                    <Route path="/profile/weight" render={() => (
                        <WeightInput
                            sex={this.state.sex}
                            name={this.state.name}
                            items={stringSeq(5.0, 1.5, 0.1)}
                            photo={this.state.photo}
                            next="/dashboard"
                            onChange={this.changeWeight.bind(this)} />
                    )}/>
                    <Route path="/dashboard" render={() => (
                        <Dashboard sex={this.state.sex} name={this.state.name} birthday={this.state.birthday} photo={this.state.photo} />
                    )}/>
                </Switch>
            </NativeRouter>
        );
    }
}