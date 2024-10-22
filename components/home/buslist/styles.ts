import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 16,
  },
  header_list: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  header_text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
  },
  separator: {
    height: 20,
  },
});
