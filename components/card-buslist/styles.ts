import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card_buslist: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: '#007bff',
    padding: 10,
    gap: 5,
    backgroundColor: 'white',
    elevation: 5,
  },
  status: {
    width: 10,
    height: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  status_content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  status_box: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  status_text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  shift_text: {
    fontSize: 16,
  },
  buslist_info_I: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buslist_name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buslist_date: {
    fontSize: 16,
  },
  buslist_info_II: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buslist_hours_init: {
    fontSize: 14,
    color: 'green',
  },
  buslist_hours_end: {
    fontSize: 14,
    color: 'red',
  },
  button_entry: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    width: 70,
  },
  button_view_list: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    width: 70,
  },
});
