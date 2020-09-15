/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { Transition, Transitioning } from 'react-native-reanimated';

const {width} = Dimensions.get('screen');
const transition = <Transition.Change durationMs={400} interpolation="easeInOut" />;

const column = {
  id: 'column',
  name: 'Column',
  layout: {
    container: {
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flex: 1,
    },
    card: {
      height: 170,
      width: '80%',
      backgroundColor: '#0159ea',
      borderRadius: 12,
    },
  },
};

const row = {
  id: 'row',
  name: 'Row',
  layout: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    card: {
      height: 70,
      flex: 1,
      backgroundColor: '#0159ea',
      borderRadius: 12,
      margin: 6,
    },
  },
};

const wrap = {
  id: 'wrap',
  name: 'Wrap',
  layout: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      flexWrap: 'wrap',
    },
    card: {
      height: 100,
      width: width / 2 - 16,
      marginHorizontal: 8,
      backgroundColor: '#0159ea',
      borderRadius: 12,
      margin: 6,
    },
  },
};

const layouts = [column, row, wrap];

function Card({style}) {
  return (
    <View style={style}>
      <View />
    </View>
  );
}

function App() {
  const [currentLayout, setCurrentLayout] = useState(layouts[0].layout);
  const ref = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <Transitioning.View style={currentLayout.container} {...{ref, transition}}>
        <Card style={currentLayout.card} />
        <Card style={currentLayout.card} />
        <Card style={currentLayout.card} />
      </Transitioning.View>
      {layouts.map((layout) => {
        return (
          <TouchableOpacity
            activeOpacity={1}
            key={layout.id}
            style={styles.touchable}
            onPress={() => {
              if (ref.current) {
                ref.current.animateNextTransition();
              }
              setCurrentLayout(layout.layout)
            }}>
            <Text style={currentLayout === layout.layout ? styles.textDisabled : styles.text}>{layout.name}</Text>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchable: {
    padding: 4,
    backgroundColor: '#daebff',
    paddingLeft: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
  textDisabled: {
    color: '#cecece',
    fontSize: 18,
    fontWeight: "500",
  }
});

export default App;
