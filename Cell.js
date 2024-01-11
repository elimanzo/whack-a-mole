import { StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

import moleSvg from './moleSvg.js';

function MoleSVG() {
  return <SvgXml xml={moleSvg} width='80%' height='80%' />;
}
export default function Cell({ cellValue }) {
  return (
    <TouchableOpacity style={styles.container}>
      {cellValue && <MoleSVG />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    aspectRatio: 1,
    bordeRadius: 8,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
