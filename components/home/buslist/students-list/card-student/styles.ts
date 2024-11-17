import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   card_container: {
        width:'100%', 
        paddingHorizontal:16
    },
    card_content: { 
        flexDirection:"row", 
        justifyContent:"space-between", 
        alignItems:"center", 
        borderBottomWidth:1, 
        marginBottom:5,
        borderColor: "#007bff"
    },
    card_content_info: {
        flexDirection:"row", 
        justifyContent:"space-between", 
        alignItems:"center", 
        gap: 10
    }
});
