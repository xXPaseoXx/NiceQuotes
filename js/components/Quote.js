import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Quote extends Component {
    render() {
        const { text, author } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
                <Text style={styles.author}>&mdash; {author}</Text>
            </View>
        )
    }
}

// als Funktion
/*
export default function Quote(probs){
    const { text, author} = probs;
    return (
        <Fragment>
          <Text>{text}</Text>
          <Text>{author}</Text>
        </Fragment>
    );
}
*/

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        backgroundColor: 'white',
        elevation: 2,
        margin: 20,
        borderRadius: 5,
    },
    text: {
        fontSize: 36,
        fontStyle: 'italic',
        margin: 10,
        textAlign: 'center'
    },
    author: {
        fontSize: 20,
        textAlign: 'right'
    }
});