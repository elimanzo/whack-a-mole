import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
  }
  return state;
}

function makeInitialState() {
  return {};
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, null, makeInitialState());
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(state, null, 2)}</Text>
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
  },
});
