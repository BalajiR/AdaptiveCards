import React from 'react';
import renderer from 'react-test-renderer';


import AdaptiveCard from '../src/adaptive-cards';

let findById = function(tree, testID) {
    if(tree.props && tree.props.testID === testID) {
        return tree
    }
    if(tree.children && tree.children.length > 0)
    {
        let childs = tree.children
        for(let i = 0; i < childs.length; i++)
        {
            let item = findById(childs[i], testID)
            if(typeof(item) !== 'undefined') {
                return item
            }
        }
    }
}


 const payload = {
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "1.0",
    "body": [
      {
        "type": "Input.Number",
        "id": "number",
        "placeholder": "Enter a number",
        "min": 1,
        "max": 10,
        "value": 3
      }
    ],
    "actions": [
      {
        "type": "Action.Submit",
        "title": "OK"
      }
    ]
  };

  customHostConfig = {
    fontFamily: "Helvetica",
    supportsInteractivity: true,
    fontSizes: {
        small: 12,
        default: 14,
        medium: 17,
        large: 21,
        extraLarge: 26
    }
}

test('AC Renderer SnapShot', () => {
    const tree = renderer.create(
        <AdaptiveCard payload = {payload}/>
    ).toJSON();

    console.log(tree);
    expect(tree).toMatchSnapshot();
   // expect(findById(tree, 'InputText')).toBeDefined()
});
