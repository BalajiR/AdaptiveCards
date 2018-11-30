/**
 * Render the adaptive card for the given payload.
 */

import React from 'react';
import { StyleSheet, View, ScrollView ,Text} from 'react-native';
import { defaultHostConfig, sethostConfig } from './utils/host-config'
import { Registry } from './components/registration/registry'
import { InputContextProvider } from './utils/context'

export default class AdaptiveCards extends React.Component {
  constructor(props) {
    super(props);
    this.payload = props.payload;
    if (props.hostConfig) {
      sethostConfig(this.props.hostConfig);
    } else {
      sethostConfig(defaultHostConfig);
    }
  }

  inputArray = {};

  addInputItem = (key, value) => {
    this.inputArray[key] = value;
  }

  /**
 * @description Parse the given payload and render the card accordingly
 */
  parsePayload = () => {
    const renderedElement = [];
    const { body, actions } = this.payload;

    if (!body)
      return renderedElement;
    const register = new Registry();

    // parse elements
    body.map((element, index) => {
      const Element = register.getComponentOfType(element.type);

      if (Element) {
        renderedElement.push(<Element json={element} key={`ELEMENT-${index}`} />);
      } else {
        renderedElement.push(<Text style={styles.highlight} key={`ELEMENT-${index}`}>I'm a <Text style={{ fontWeight: 'bold' }}>{element.type}</Text> element</Text>);
      }
    });

    // parse actions
    if (actions) {
      renderedElement.push(<View key="AC-CONTAINER" style={styles.actionContainer} />);
      actions.map((action, index) => {
        const ActionButton = register.getActionOfType(action.type);
        if (ActionButton) {
          renderedElement.push(<ActionButton key={`ACTION-${index}`} json={action} actionHandler={null} />);
        }

      });
    }
    return renderedElement;
  }

  render() {
    const { addInputItem } = this;
    const inputArray = this.inputArray;
    const onExecuteAction = this.props.onExecuteAction;

    return (
      <InputContextProvider value={{ addInputItem, inputArray, onExecuteAction }}>
        <View style={styles.container}>
          <ScrollView>
            {this.parsePayload()}
          </ScrollView>
        </View>
      </InputContextProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  highlight: {
    backgroundColor: 'yellow',
    marginVertical: 5,
    paddingVertical: 5,
    fontSize: 15
  },
  actionContainer: {
    marginVertical: 10
  }
});
