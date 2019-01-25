 import React from 'react';
 import { View, Text, StyleSheet } from 'react-native';
 import renderer from 'react-test-renderer';


import {
	DateInput,
	TimeInput,
	ToggleInput,
	NumberInput,
	ChoiceSetInput,
	InputText,
} from '../src/components/inputs';

 import { Input } from '../src/components/inputs/input';


 beforeEach(() => {
  jest.resetModules();
});

inputArray = {};

addInputItem = (key, value) => {
  this.inputArray[key] = value;
}

const onExecuteAction = jest.fn;
const isTransparent = true ;
const onParseError = jest.fn;
const lang = 'en';

const getContext = (context = { lang, addInputItem, inputArray, onExecuteAction, isTransparent, onParseError } ) => {

  console.log("Context:::::",context);
  jest.doMock('../src/utils/context', () => {
    return {
      InputContext: {
        Consumer: (props) => props.children(context)
      }
    }
});

return require('../src/components/inputs/input').Input;

}
 const payload = 
    {
      "type": "Input.Number",
      "id": "number",
      "placeholder": "Enter a number",
      "min": 1,
      "max": 10,
      "value": 3
    };

 it('renders a Input component using Snapshots', () => {
  expect(renderer.create(
    <Input
				json={payload}
				handleFocus= {jest.fn}
				handleBlur={jest.fn}
				textValueChanged={(text, addInputItem) => {jest.fn}}
				value={jest.fn}
				isError={jest.fn}
				keyboardType={jest.fn}
				textStyle={jest.fn}
			/>
  )).toMatchSnapshot();
});


describe('<Input />', () => {
  it('should return default Input', () => {
    // This will use the default context param 
    const Input = getContext();
  expect(renderer.create(
<Input/>
  )).toMatchSnapshot();

    //const wrapper = mount(<Input/>);
    //  console.log("wrapper::::",wrapper);
    // expect(wrapper.find('li').length).toBe(3);
});
});