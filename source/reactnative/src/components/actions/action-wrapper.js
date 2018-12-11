/**
 * Wrapper to render the actions from given payload.
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Registry } from '../registration/registry';
import * as Constants from '../../utils/constants';
import { InputContextConsumer } from '../../utils/context'
import AdaptiveCards from '../../adaptive-cards'
import * as Utils from '../../utils/util'
import * as Enums from '../../utils/enums'

const padding = 10;

export class ActionWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowCard: false,
      cardJson: null,
    }
  }

  hasShowCard = false;

  onShowAdaptiveCard = (adaptiveCard) => {
    let isDifferentcard = (Utils.isNullOrEmpty(this.state.cardJson) ? false :
      (adaptiveCard === this.state.cardJson ? false : true));
    this.setState(prevState => ({
      isShowCard: !prevState.isShowCard,
      cardJson: adaptiveCard
    }));
    if (isDifferentcard) {
      setTimeout(() => {
        this.setState({ isShowCard: true });
      }, 50)
    }
  }

  /**
    * @description Parses the actions from the given json
    */
  parseActionsArray = (onParseError) => {
    const renderedElement = [];
    const { actions } = this.props

    if (!actions)
      return renderedElement;

    actions.map((element, index) => {
      const Element = Registry.getManager().getComponentOfType(element.type);
      if (Element) {

        let isValid = true;
        for (var key in Registry.getManager().validateSchemaForType(element.type)) {
          if (!element.hasOwnProperty(key)) {
            let error = { "error": Enums.ValidationError.PropertyCantBeNull, "message": `Required property ${key} for ${element.type} is missing` };
            onParseError(error);
            isValid = false;
          }
        }
        if (isValid) {
          if (element.type === 'Action.ShowCard') {
            this.hasShowCard = true;
            renderedElement.push(
              <Element
                json={element}
                onShowCardTapped={this.onShowAdaptiveCard}
                key={`${element.type}-${index}`}
              />);
          }
          else {
            renderedElement.push(<Element json={element} key={`${element.type}-${index}`} />);
          }
        }
      } else {
        let error = { "error": Enums.ValidationError.UnknownElementType, "message": `Unknown Type ${element.type} encountered` };
        onParseError(error);
        return null;
      }
    });
    return renderedElement;
  }

  render() {
    return (<InputContextConsumer>
      {({ onExecuteAction, onParseError }) =>
        <View>
          <View style={[styles.actionButtonContainer]}>
            {this.parseActionsArray(onParseError)}
          </View>
          {this.hasShowCard ? ((this.state.isShowCard) ?
            <AdaptiveCards
              payload={this.state.cardJson}
              onExecuteAction={onExecuteAction} isActionShowCard={true} /> : null) : null}
        </View>
      }
    </InputContextConsumer>);
  }
}

const styles = StyleSheet.create({
  actionButtonContainer: {
    flex: 1,
    paddingTop: padding,
    flexWrap: Constants.FlexWrap,
    flexDirection: Constants.FlexRow,
    justifyContent: Constants.CenterString
  },
  actionContainer: {
    marginVertical: padding
  }
});

