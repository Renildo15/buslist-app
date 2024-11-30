import { OptionType } from "@/utils/data";
import { View, Text } from "../Themed";
import { RadioButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

type StatusType = 'checked' | 'unchecked' | undefined;
interface IRadioButtonProps{
    item: OptionType
    status: StatusType
    handleSelect: (itemId: string, isFiltered: boolean | null) => void;
}

export default function RadioButtonComponent(props: IRadioButtonProps) {
    return(
        <View style={styles.itemContainer}>
            <RadioButton
                value={props.item.id}
                status={props.status}
                onPress={() => props.handleSelect(props.item.id, props.item.is_filtereded ?? null)}
                uncheckedColor="white"
                color="white"
            />
            <Text style={{ color: 'white' }}>{props.item.type}</Text>
        </View>
    )
}

export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    margin: 6,
    backgroundColor: '#007bff',
  },
});
