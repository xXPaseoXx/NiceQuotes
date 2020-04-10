import React, { Component } from 'react';
import { Button, Modal, TextInput, View, StyleSheet } from 'react-native';

export default class NewQuote extends Component {
    state = { content: null, author: null };
    render() {
        const { visible, onSave } = this.props;
        const { content, author } = this.state;
        return (
            <Modal
                visible={visible}
                onRequestClose={() => {
                    this.setState({ content: null, author: null });
                    onSave(null, null);
                }}
                animationType="slide">
                <View style={styles.container}>
                    <TextInput style={[styles.input, { height: 150 }]} onChangeText={text => this.setState({ content: text })} multiline={true} placeholder="Inhalt des Zitats">

                    </TextInput>
                    <TextInput style={styles.input} placeholder="Autor/in des Zitats" onChangeText={text => this.setState({ author: text })}>

                    </TextInput>
                    <Button
                        title="Speichern"
                        onPress={() => {
                            this.setState({ content: null, author: null });
                            onSave(content, author);
                        }} />
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'deepskyblue',
        borderRadius: 4,
        width: '80%',
        marginBottom: 20,
        fontSize: 20,
        padding: 10,
        height: 50,
    }
});