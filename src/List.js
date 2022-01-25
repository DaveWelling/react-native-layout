import { createElement as rc, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { FlatList } from 'react-native';
import ListItemRenderer from './ListItemRenderer';
import _styled from 'styled-components/native/dist/styled-components.native.esm';
/** @type {import('styled-components').StyledInterface} */
const styled = _styled.default ?? _styled;

const BoundedFlatList = styled(FlatList).attrs({ name: 'BoundedFlatList', initialNumToRender: 1 })`
    flex-grow: 0;
    flex: 1;
`;

export default props => {
    const { data, onClick, Row, RowDetail, highlightedIndex, selectedItem, getItemProps, style, id, testID } = props;
    const theme = useContext(ThemeContext);

    return rc(BoundedFlatList, {
        style: [style, { height: '100%', width: '100%' }],
        name: 'list',
        data,
        testID: `list${testID ?? id}`,
        // Needed for Appium testing
        accessibility: true,
        accessibilityLabel: `list${testID ?? id}`,
        renderItem: ({ item, index }) =>
            rc(ListItemRenderer, {
                item,
                onClick,
                Row,
                highlightedIndex,
                selectedItem,
                getItemProps,
                index,
                theme,
                RowDetail
            }),
        keyExtractor: (item, index) => item._id ?? item.tagId ?? index
    });
};
