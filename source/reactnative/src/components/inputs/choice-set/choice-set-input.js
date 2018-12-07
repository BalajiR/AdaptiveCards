/**
 * ChoiceSet Component.
 * 
 * Refer https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/card-schema#inputchoiceset
 */

import React from 'react';
import { StyleSheet, Text, View, Picker, TouchableOpacity, Image } from 'react-native';
import Input from '../input';
import Checkbox from './check-box';
import { InputContextConsumer } from '../../../utils/context';
import * as Utils from '../../../utils/util';
import * as Constants from '../../../utils/constants';
import { StyleManager } from '../../../styles/style-config'
import { HostConfigManager } from '../../../utils/host-config'

const DropDownImage = './assets/dropdown.png';
const CompactStyle = "compact";

export class ChoiceSetInput extends React.Component {

    styleConfig = StyleManager.getManager().styles;

    constructor(props) {
        super(props);

        this.id = Constants.EmptyString;
        this.isMultiSelect = Boolean;
        this.style = Constants.EmptyString;
        this.type = Constants.EmptyString;
        this.value = Constants.EmptyString;
        this.choices = [];
        this.payload = props.json
        this.state = {
            selectedPickerValue: undefined,
            isPickerSelected: false,
            radioButtonIndex: undefined,
            activeIndex: undefined,
            checked: undefined,
            checkedValues: undefined
        }
    }

    /**
     * @description Parse hostconfig specific to this element
     */
    parseHostConfig() {
        this.id = this.payload.id;
        this.type = this.payload.type;
        this.isMultiSelect = this.payload.isMultiSelect;
        this.value = this.payload.value;
        this.style = this.payload.style;
        this.choices = this.payload.choices;
    }

    /**
     * @description Fetches the value from the selected picker option
     * @param {string} value 
     */
    getPickerSelectedValue = (value, addInputItem) => {
        if (Utils.isNullOrEmpty(value))
            return Constants.EmptyString
        let choiceName = this.choices.find(choice => choice.value === value);
        addInputItem(this.id, value);
        return choiceName.title
    }

    /**
     * @description Fetches the index of the selected radio button choice
     * @param {string} value 
     * @param {array} choiceArray
     */
    getRadioButtonIndex = (value, choiceArray, addInputItem) => {
        if (Utils.isNullOrEmpty(value)) {
            return -1
        }
        addInputItem(this.id, value);

        for (var i = 0; i < choiceArray.length; i++) {
            if (choiceArray[i]["value"] === value) {
                return i;
            }
        }
        return -1;
    }

    /**
     * @description Selects the checboxes for the initial set of values from json
     * @param {string} value 
     */
    setInitialCheckedValues = (value, addInputItem) => {
        var array = this.getCheckedIndexes(value);
        if (array.length > 0) {
            addInputItem(this.id, value)
            return array
        }
        addInputItem(this.id, Constants.EmptyString)
        return []
    }

    /**
     * @description Fetches the indexes of selected checkbox options
     * @param {string} value 
     */
    getCheckedIndexes = (value) => {
        if (Utils.isNullOrEmpty(value)) {
            return []
        }
        var array = value.split(',')
        return array
    }

    /**
     * @description Renders Picker component as per the json
     */
    renderPickerComponent(addInputItem) {
        return (
            <View style={styles.containerView}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={onPress}>
                    <View style={styles.touchView}>
                        <Text
                            style={[styles.text, this.styleConfig.fontConfig]}
                        >
                            {this.state.selectedPickerValue == undefined ?
                                this.getPickerSelectedValue(this.value, addInputItem) :
                                this.getPickerSelectedValue(this.state.selectedPickerValue,
                                    addInputItem)
                            }
                        </Text>
                        <Image
                            style={styles.button}
                            source={require(DropDownImage)}
                        />
                    </View>
                </TouchableOpacity>
                {this.state.isPickerSelected &&
                    <Picker
                        mode={'dropdown'}
                        selectedValue={this.state.selectedPickerValue}
                        style={styles.pickerContainer}
                        onValueChange={
                            (itemValue, itemIndex) => {
                                this.setState({
                                    selectedPickerValue: itemValue,
                                })
                                addInputItem(this.id, itemValue);
                            }}>
                        {this.choices.map((item, key) => (
                            <Picker.Item
                                label={item.title}
                                value={item.value} key={key}
                            />)
                        )}
                    </Picker>
                }
            </View>
        )
    }

    /**
     * @description Renders Checkboxes component as per the json
     */
    renderCheckBoxComponent(addInputItem) {
        return (
            <View style={styles.container}>
                {this.choices.map((item, index) => (
                    <Checkbox
                        style={styles.container}
                        label={item.title}
                        key={index}
                        isRadioButtonType={true}
                        index={index}
                        labelStyle={[styles.labelStyle, this.styleConfig.fontConfig]}
                        iconSize={28}
                        checked={this.state.activeIndex == undefined ?
                            index == this.getRadioButtonIndex(this.value,
                                this.choices, addInputItem) :
                            index == this.state.activeIndex}
                        onChange={() => {
                            this.setState({ activeIndex: index })
                            addInputItem(this.id, item.value);
                        }}
                    />
                ))}
            </View>)
    }

    /**
     * @description Renders Radio Button component as per the json
     */
    renderRadioButtonComponent(addInputItem) {
        return (
            <View>
                {this.choices.map((item, index) => (
                    <Checkbox
                        style={styles.container}
                        label={item.title}
                        key={index}
                        isRadioButtonType={false}
                        index={index}
                        labelStyle={styles.labelStyle}
                        iconSize={28}
                        checked={this.state.checkedValues == undefined ?
                            this.setInitialCheckedValues(this.value,
                                addInputItem).includes(item.value) :
                            this.getCheckedIndexes(this.state.checkedValues).includes(item.value)}
                        onChange={() => {
                            let checkedArray = (this.state.checkedValues == undefined) ?
                                this.getCheckedIndexes(this.value) :
                                this.getCheckedIndexes(this.state.checkedValues)
                            if (checkedArray.includes(item.value)) {
                                let checkedIndex = checkedArray.indexOf(item.value)
                                checkedArray.splice(checkedIndex, 1)
                            } else {
                                checkedArray.push(item.value)
                            }
                            let newValue = checkedArray.sort().join()
                            this.setState({ checkedValues: newValue })
                            addInputItem(this.id, newValue);
                        }
                        }
                    />
                ))}
            </View>
        )
    }

    render() {

        if (HostConfigManager.getHostConfig().supportsInteractivity === false) {
            let error = {
                "error": Error.ValidationError.InteractivityNotAllowed,
                "message": `Interactivity is not allowed based on schema`
            };
            onParseError(error);
            return null;
        }

        this.parseHostConfig();

        let { id,
            isMultiSelect,
            style,
            choices,
            type,
            value,
        } = this

        onPress = () => {
            this.setState({
                isPickerSelected: !this.state.isPickerSelected
            })
        }

        return (
            <InputContextConsumer>
                {({ addInputItem }) => (
                    <Input json={this.payload} style={styles.containerView}>
                        {!isMultiSelect ?
                            ((style == CompactStyle || style == undefined) ?
                                this.renderPickerComponent(addInputItem) :
                                this.renderCheckBoxComponent(addInputItem)) :
                            this.renderRadioButtonComponent(addInputItem)
                        }
                    </Input>)}
            </InputContextConsumer>
        );
    }
}

const styles = StyleSheet.create({
    containerView: {
        alignSelf: Constants.AlignStretch,
        flex: 1
    },
    pickerContainer: {
        backgroundColor: Constants.EmphasisColor,
    },
    touchView: {
        flexDirection: Constants.FlexRow,
        justifyContent: Constants.SpaceBetween,
        alignItems: Constants.FlexEnd,
        backgroundColor: Constants.EmphasisColor,
    },
    text: {
        color: 'black',
        textAlign: Constants.LeftAlign,
        marginTop: 10,
        marginLeft: 8,
        height: 30,
    },
    button: {
        height: 30,
        width: 30,
        marginBottom: 8,
        marginRight: 8,
    },
    labelStyle: {
        marginLeft: 8
    }
});
