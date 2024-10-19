import { TouchableOpacity, View } from "react-native";
import { Text } from "../Themed";
import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";

export default function CardBuslist() {
    return(
        <View style={styles.card_buslist}>
            <View style={styles.status_content}>
                <View style={styles.status_box}>
                    <View style={styles.status}></View>
                    <Text style={styles.status_text}>Disponível</Text>
                </View>
                <Text style={styles.shift_text}>Noturno</Text>
            </View>
            <View style={styles.buslist_info_I}>
                <Text style={styles.buslist_name}>Nome Da Lista</Text>
                <Text style={styles.buslist_date}>20/07/2024</Text>
            </View>
            <View style={styles.buslist_info_II}>
                <View style={{gap: 4}}>
                    <Text style={styles.buslist_hours_init}>Inicio - 12:00</Text>
                    <Text style={styles.buslist_hours_end}>Término - 16:00</Text>
                </View>
                <View style={{gap: 4}}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button_entry}
                    >
                        <Text style={{color:'white'}}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button_view_list}
                    >
                        <Text style={{color:'white'}}>Ver lista</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flexDirection:'row', gap:3, alignItems:'center'}}>
                <Feather name="users" size={16} color="black" />
                <Text>25 pessoas</Text>
            </View>
        </View>
    )
}