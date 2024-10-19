import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#007bff',
  },
  header_image: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    gap: 10,
  },
  welcome_message: {
    color: '#fff',
    fontSize: 16,
  },
  date_now: {
    color: '#fff',
    fontSize: 16,
  },
});
