import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    content_notice: {
        borderWidth:1, 
        flexDirection:'row', 
        alignItems: 'center', 
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        borderColor: '#007bff',
        padding: 10,
        gap: 5,
        backgroundColor: 'white',
        elevation: 5,
    },
    title_content : {
        flexDirection:'row', 
        alignItems: 'center', 
        justifyContent:'space-between', 
        gap:6,
        backgroundColor:'transparent'
    },
    title: {
        fontSize:16, 
        fontWeight:'bold'
    },
    subtitle: {
        fontSize:10
    },
    circleIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginLeft: 10,
      },
});
