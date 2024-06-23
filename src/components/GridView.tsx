import {Box} from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';

interface Props<T> {
  data: T[];
  renderItem(item: T): JSX.Element;
  col?: number;
}
function GridView<T extends any>(props: Props<T>) {
  const {col = 2, data, renderItem} = props;
  return (
    <>
      <Box style={styles.container}>
        {data?.map(item => (
          <Box style={{width: Dimensions.get('window').width / col}}>
            {renderItem(item)}
          </Box>
        ))}
      </Box>
    </>
  );
}

export default GridView;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
