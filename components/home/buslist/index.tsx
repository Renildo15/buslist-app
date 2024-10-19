import { Text } from "@/components/Themed";
import { styles } from './styles';
import { View } from "react-native";
import CardBuslist from "@/components/card-buslist";

export function Buslist() {
    return (
        <View style={styles.container}>
            <View style={styles.header_list}>
                <Text style={styles.header_text}>Listas de Hoje</Text>
                <Text>19/10/2024</Text>
            </View>
            <CardBuslist/>
            <CardBuslist/>
            <CardBuslist/>
        </View>
    );
}