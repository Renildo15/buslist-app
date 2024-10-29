import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
  },
  header_text: { fontSize: 18, fontWeight: 'bold' },
  avatar_container: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  student_info_box: { flexDirection: 'column' },
  camera_icon: {
    position: 'relative',
  },
  camera_icon_position: {
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
  box_update_avatar: {
    justifyContent:'center', 
    alignItems:'center',
    marginTop:10
  },
  button_update_avatar: {
    padding:10, 
    borderRadius:5, 
    backgroundColor:'#007bff'
  }
});
