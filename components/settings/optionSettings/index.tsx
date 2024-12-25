import { View, Text } from "@/components/Themed";
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface OptionSettingsProps {
    handle: () => void;
    iconName: string;
    text: string;
}

export default function OptionSettings(props: OptionSettingsProps) {
    return (
      <TouchableOpacity onPress={props.handle} style={{ width: '100%', paddingHorizontal: 16 }}>
          <View style={styles.option}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <FontAwesome name={props.iconName as any} size={24} />
                <Text>{props.text}</Text>
              </View>
              <FontAwesome name="chevron-right" size={24} />
          </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    padding: 16,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
