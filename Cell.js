import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import moleSvg from './moleSvg.js';

function MoleSVG() {
  return <SvgXml xml={moleSvg} width='80%' height='80%' />;
}
export default function Cell({
  cellValue,
  rowIndex,
  colIndex,
  dispatch,
  isGameOver,
}) {
  const Container = cellValue != null && !isGameOver ? TouchableOpacity : View;
  const onPress =
    cellValue != null
      ? () => dispatch({ type: 'whack-mole', rowIndex, colIndex })
      : undefined;
  return (
    <Container style={styles.container} onPress={onPress}>
      {cellValue && <MoleSVG />}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: '#987654',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
