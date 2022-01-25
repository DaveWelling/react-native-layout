import { memo, createElement as rc } from 'react';

const ListItemRenderer = props => {
    const { item, onClick, Row, highlightedIndex, selectedItem, getItemProps, index, theme, RowDetail } = props;
    let rowProps = {
        name: 'list-row',
        onPress: () => {
            onClick(item);
        }
    };

    // if getItemProps is passed, it means this is a dropdown list created using downshift.
    // Downshift wants to add additional properties.
    if (getItemProps != null) {
        rowProps = {
            ...rowProps,
            ...getItemProps({
                item,
                index,
                isActive: highlightedIndex === index,
                isSelected: selectedItem === item
            })
        };
    }
    // prettier-ignore
    return rc(Row, rowProps,
        rc(RowDetail, {
            item,
            theme,
            rowIndex: index,
            onClick,
            testID: `listRow${index}`,
            // Needed for Appium testing
            accessibility: true,
            accessibilityLabel: `listRow${index}`
        })
    );
};
ListItemRenderer.displayName = 'ListItemRenderer';
export default memo(ListItemRenderer);
