import React, { useState, useEffect, createElement as rc } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, KeyboardAvoidingView } from 'react-native';
import List from './List';

import {
    View,
    Text,
    OuterVertical,
    Top,
    Horizontal,
    Left,
    Right,
    Wrapping,
    Bottom,
    FormField,
    TextInput,
    ScrollContainer,
    Row
} from './styles';

const onClick = () => {}; // do nothing
const RowDetail = props => {
    return rc(Text, null, props.item.title);
};

const App = () => {
    const [rowData, setRowData] = useState([]);
    useEffect(() => {
        let newData = [];
        for (let i = 0; i < 500; i++) {
            newData.push({ row: i, title: `row${i}` });
        }
        setRowData(newData);
    }, []);
    const [fields, setFields] = useState([]);
    useEffect(() => {
        let newFields = [];
        for (let i = 0; i < 20; i++) {
            newFields.push({ field: i, title: `field${i}` });
        }
        setFields(newFields);
    }, []);

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <OuterVertical>
                <Top>
                    <Horizontal>
                        <Left></Left>
                        <Right>
                            <ScrollContainer>
                                <Wrapping>
                                    {fields.map((f, i) => {
                                        return (
                                            <FormField key={i}>
                                                <Text>{f.title}</Text>
                                                <TextInput></TextInput>
                                            </FormField>
                                        );
                                    })}
                                </Wrapping>
                            </ScrollContainer>
                        </Right>
                    </Horizontal>
                </Top>
                <Bottom>
                    <Horizontal>
                        <Left>
                            <Text>Bottom Left</Text>
                        </Left>
                        <Right>{rc(List, { data: rowData, itemCount: rowData.length, onClick, Row, RowDetail })}</Right>
                    </Horizontal>
                </Bottom>
            </OuterVertical>
        </KeyboardAvoidingView>
    );
};

export default App;
