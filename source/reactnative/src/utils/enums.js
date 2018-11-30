export const Size = Object.freeze({
    Auto:   0,
    Stretch: 1,
    Small: 2,
    Medium: 3,
    Large: 4
});

export const SizeUnit = Object.freeze({
    Weight:   0,
    Pixel:  1
});

export const TextSize = Object.freeze({
    Small:   0,
    Default:  1,
    Medium: 2,
    Large: 3,
    ExtraLarge: 4
});

export const Spacing = Object.freeze({
    None: 0,
    Small: 1,
    Default: 2,
    Medium: 3,
    Large: 4,
    ExtraLarge: 5,
    Padding: 6
});

export const TextWeight = Object.freeze({
    Lighter: 0,
    Default: 1,
    Bolder: 2
});

export const TextColor = Object.freeze({
    Default: 0,
    Dark: 1,
    Light: 2,
    Accent: 3,
    Good: 4,
    Warning: 5,
    Attention: 6
});

export const HorizontalAlignment = Object.freeze({
    Left: 0,
    Center: 1,
    Right: 2
});

export const VerticalAlignment = Object.freeze({
    Top: 0,
    Center: 1,
    Bottom: 2
});

export const ActionAlignment = Object.freeze ({
    Left: 0,
    Center: 1,
    Right: 2,
    Stretch: 3
});

export const ImageStyle = Object.freeze({
    Default: 0,
    Person: 1
});

export const ShowCardActionMode = Object.freeze({
    Inline: 0,
    Popup: 1
});

export const Orientation = Object.freeze({
    Horizontal: 0,
    Vertical: 1
});

export const BackgroundImageMode = Object.freeze ({
    Stretch: 0,
    RepeatHorizontally: 1,
    RepeatVertically: 2,
    Repeat: 3
});

export const ActionIconPlacement = Object.freeze({
    LeftOfTitle: 0,
    AboveTitle: 1
});

export const InputTextStyle = Object.freeze ({
    Text: 0,
    Tel: 1,
    Url: 2,
    Email: 3,
    Number: 4
});

export const ContainerStyle = Object.freeze({
    Default:   "default",
    Emphasis:  "emphasis"
});

export const ValidationError = Object.freeze({
    Hint:0,
    ActionTypeNotAllowed:1,
    CollectionCantBeEmpty:2,
    Deprecated:3,
    ElementTypeNotAllowed:4,
    InteractivityNotAllowed:5,
    InvalidPropertyValue:6,
    MissingCardType:7,
    PropertyCantBeNull:8,
    TooManyActions:9,
    UnknownActionType:10,
    UnknownElementType:11,
    UnsupportedCardVersion:12
});

export const ContainerFitStatus = Object.freeze ({
    FullyInContainer: 0,
    Overflowing: 1,
    FullyOutOfContainer: 2
});

export const Height = Object.freeze({
    Auto: 0,
    Stretch: 1
});
