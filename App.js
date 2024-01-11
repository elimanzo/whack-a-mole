import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useReducer, useEffect } from 'react';

import make2DArray from './make2DArray';
import Board from './Board';
function reducer(state, action) {
  switch (action.type) {
    case 'whack-mole': {
      return state;
    }
    case 'new-game': {
      return makeInitialState();
    }
    case 'move-moles': {
      return state;
    }
  }
  return state;
}

function makeInitialState() {
  return { board: make2DArray(3, 3, 'Mole') };
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, null, makeInitialState);
  useEffect(() => {
    console.log('setting up effect');
    const intervalId = setInterval(() => {
      console.log('dispatching');
      dispatch({ type: 'move-moles' });
    }, 6000);
    return () => {
      console.log('cleaning up effect');
      clearInterval(intervalId);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Whack A Mole!</Text>
      <Board board={state.board} />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontSize: 25,
  },
});
