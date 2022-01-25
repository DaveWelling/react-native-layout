import { createElement as rc, useState } from 'react';
import { View as _View, Text as _Text, TextInput as _TextInput, ScrollView as _ScrollView } from 'react-native';
import _styled from 'styled-components/native/dist/styled-components.native.esm';
/** @type {import('styled-components').StyledInterface} */
const styled = _styled.default ?? _styled;

export const View = styled(_View)`
    flex-direction: row;
    align-content: stretch;
    flex-shrink: 1;
    overflow: hidden;
`;

export const FormField = styled(View)`
    flex-shrink: 0;
    margin: 6px;
`;

export const Text = styled(_Text)`
    color: black;
    background-color: pink;
`;

export const TextInput = styled(_TextInput)`
    background-color: magenta;
`;

export const Outer = styled(View)`
    height: 100%;
    width: 100%;
`;

export const Vertical = styled(View)`
    background-color: white;
    flex-grow: 1;
    flex-direction: column;
`;

export const OuterVertical = styled(View)`
    height: 100%;
    width: 100%;
    background-color: white;
    flex-grow: 1;
    flex-direction: column;
    padding: 5px;
`;

export const Horizontal = styled(View)`
    flex-direction: row;
    background-color: gray;
    flex-grow: 1;
`;

export const Bottom = styled(View)`
    flex-basis: 50%;
    background-color: green;
    flex-shrink: 0;
    flex-grow: 1;
    padding: 10px;
`;

export const Left = styled(View)`
    background-color: purple;
    flex-grow: 0;
    padding: 10px;
`;

// padding: 10px;
export const Top = styled(View)`
    background-color: blue;
    flex-grow: 0;
    min-height: 96px;
    padding: 8px;
`;
// padding: 10px;
export const Right = styled(View)`
    flex-basis: 50%;
    background-color: orange;
    flex-grow: 1;
    flex-shrink: 0;
    flex-direction: column;
    padding: 14px;
`;

export const Row = styled(View)`
    margin: 5px;
    background-color: burlywood;
`;

// The parent of this control cannot have padding.  I know that's ridiculous.
const _ScrollContainer = styled(_ScrollView)`
    flex-direction: column;
    overflow: hidden;
    align-content: stretch;
    flex-shrink: 1;
`;

export const ScrollContainer = props => {
    const [minHeight, setMinHeight] = useState();
    // React Native Scrollview has a weird problem where padding > 18 density independent pixels (dp)
    // in ancestors causes it to recalculate content height as smaller when the keyboard displays.
    // For some reason it recalculates the height when keyboard displays if paddings > 18 dp, but
    // not otherwise (at least in this code).
    // Interestingly, it seems to happen when any combination of ancestors (other than the outer-most)
    // has padding that sums together to be > 18dp.  Then (even weirder) it multiplies the difference
    // by 14 and subtracts it from the content height.  So two ancestors (lets say parent and grandparent)
    // have a combined padding of 22, then the height subtracted from Scrollview content would be
    // (22-18)*14 = 56 dp.
    //
    // This code just keeps the first content height calculated and uses it as minHeight from then on.
    const onContentSizeChange = (contentWidth, contentHeight) => {
        setMinHeight(prev => {
            if (prev != null) {
                return prev;
            }
            return contentHeight;
        });
    };
    return rc(_ScrollContainer, {
        ...props,
        horizontal: false,
        contentContainerStyle: {
            flexDirection: 'column',
            overflow: 'hidden',
            alignContent: 'stretch',
            minHeight
        },
        onContentSizeChange
    });
};

export const Wrapping = styled(View)`
    flex-wrap: wrap;
`;
