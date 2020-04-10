import React from 'react';
import { StyleSheet, View, Button, Text, AsyncStorage, Alert } from 'react-native';
import Quote from './js/components/Quote';
import NewQuote from './js/components/NewQuote';

function StyledButton(probs) {
  let button = null;
  if (probs.visible)
    button = (
      <View style={probs.style}>
        <Button title={probs.title} onPress={probs.onPress} />
      </View>
    );
  return button;
}

const data = [
  {
    text:
      'Probleme kann man niemals mit derselben Denkweise lösen, durch die sie entstanden sind.',
    author: '  Albert Einstein'
  },
  {
    text:
      'Man braucht nichts im Leben zu fürchten, man muss nur alles verstehen.',
    author: '  Marie Curie'
  },
  {
    text:
      'Nichts ist so beständig wie der Wandel.', author: '  Heraklit'
  },
  {
    text:
      'Ein kluges Mädchen küsst, aber liebt nicht, hört zu, aber glaubt nicht und verlässt, bevor sie verlassen wird.',
    author: '  Marilyn Monroe'
  },
  {
    text:
      'Wir leben alle unter dem gleichen Himmel, aber wir haben nicht alle den gleichen Horizont.',
    author: '  Konrad Adenauer'
  },
  {
    text:
      'Das Leben ist eine Illusion, hervorgerufen durch Alkoholmangel.',
    author: '  Charles Bukowski'
  },
  {
    text:
      'Wer noch nie einen Fehler gemacht hat, hat sich noch nie an Neuem versucht.',
    author: '  Albert Einstein'
  }

];
export default class App extends React.Component {
  state = { index: 0, showNewQuoteScreen: false, quotes: data };

  _retrieveData = async () => {
    /*  AsyncStorage.getItem('QUOTES').then(value => {
          if(value !== null){
            value = JSON.parse(value);
            this.setState({quotes: value});
          }
        }); */
    let value = await AsyncStorage.getItem('QUOTES');
    if (value !== null) {
      value = JSON.parse(value);
      this.setState({ quotes: value });
    }
  }
  _storeData(quotes) {
    AsyncStorage.setItem('QUOTES', JSON.stringify(quotes));
  }
  _addQuote = (text, author) => {
    let { quotes } = this.state;
    if (text && author) {
      quotes.push({ text, author });
      this._storeData(quotes);
    }
    this.setState({ index: quotes.length - 1, showNewQuoteScreen: false, quotes });
  }
  _displayNexQuote() {
    let { index, quotes } = this.state;
    let nextIndex = index + 1;
    if (nextIndex === quotes.length) nextIndex = 0;
    this.setState({ index: nextIndex });
  }

  _deleteButton() {
    Alert.alert('Zitat löschen?', 'Dies kann nicht rückgängig gemacht werden.',
      [{ text: 'Abbrechen' }, { text: 'Löschen', onPress: () => this._deleteQuote() }]);

  }

  _deleteQuote() {
    let { index, quotes } = this.state;
    quotes.splice(index, 1);
    this._storeData(quotes);
    this.setState({ index: 0, quotes });
  }
  componentDidMount() {
    this._retrieveData();
  }

  // Darstellung im UI
  render() {
    let { index, quotes } = this.state;
    const quote = quotes[index];

    let backIndex = index - 1;
    if (backIndex === 0) backIndex = [quotes.length - 1];

    let content = <Text style={{ fontSize: 36 }}>Keine Zitate</Text>;
    if (quote) {
      content = <Quote text={quote.text} author={quote.author} />;
    }
    return (
      <View style={styles.container}>

        <StyledButton style={styles.newButton} visible={true} title="Neu" onPress={() => this.setState({ showNewQuoteScreen: true })} />
        <StyledButton style={styles.deleteButton} visible={quotes.length >= 1} title="Löschen" onPress={() => this._deleteButton()} />
        <NewQuote
          visible={this.state.showNewQuoteScreen}
          onSave={(this._addQuote)} />
        {content}
        <StyledButton style={styles.nextButton} visible={quotes.length >= 2} title="Nächstes Zitat" onPress={() => this._displayNexQuote()} />
        <StyledButton style={styles.backButton} visible={quotes.length >= 2} title="Vorheriges Zitat" onPress={() => this.setState({ index: backIndex })} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    position: 'absolute',
    bottom: 10,
    width: 200
  },
  backButton: {
    position: 'absolute',
    bottom: 50,
    width: 200
  },
  newButton: {
    position: 'absolute',
    right: 15,
    top: 50
  },
  deleteButton: {
    position: 'absolute',
    left: 15,
    top: 50
  }
});