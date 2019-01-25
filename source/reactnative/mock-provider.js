import React from 'react';
import { InputContext } from './mock-context';

class MockApp extends React.Component {
    constructor(props) {
      super(props);
      
      this.state = {
       
      }
    }
    inputArray = {};

    addInputItem = (key, value) => {
		this.inputArray[key] = value;
	}
     render(){
		const onExecuteAction = jest.fn;
		const isTransparent = false;
		const onParseError = jest.fn;
		const lang = 'en';
        return (

            <InputContext.Provider value={{ lang, addInputItem, inputArray, onExecuteAction, isTransparent, onParseError }}>
                  {this.props.children}
            </InputContext.Provider>
          )
     }
  
  }; 