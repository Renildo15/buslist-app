import React, { useEffect, useState } from 'react';
import { View, Text } from '@/components/Themed';
import SelectDropdown from 'react-native-select-dropdown';
import { styles } from './styles';
import { IBusStop } from '@/api/interfaces/busstop';

interface ISelectBusStopProps {
  onSelect: (stop: IBusStop) => void;
  data: IBusStop[];
  initialSelectedItem?: IBusStop;
}

export default function SelectBusStop({
  data,
  onSelect,
  initialSelectedItem,
}: ISelectBusStopProps) {
  const [selectedItem, setSelectedItem] = useState<IBusStop | null>(null);

  useEffect(() => {
    if (initialSelectedItem) {
      setSelectedItem(initialSelectedItem);
    }
  }, [initialSelectedItem]);

  return (
    <SelectDropdown
      data={data}
      onSelect={(item: IBusStop, index: number) => {
        setSelectedItem(item);
        onSelect(item);
      }}
      renderButton={() => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text
              style={{
                ...styles.dropdownButtonTxtStyle,
                color: selectedItem ? 'black' : '#ccc',
              }}
            >
              {selectedItem ? selectedItem.name : 'Selecione a parada'}
            </Text>
          </View>
        );
      }}
      renderItem={(item: IBusStop, index: number, isSelected: boolean) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: '#D2D9DF' }),
            }}
          >
            <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
}
