import {GestureHandlerRootView } from 'react-native-gesture-handler';
import { ListRenderItem, SectionListData, StyleSheet } from 'react-native';
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetSectionList,
  } from '@gorhom/bottom-sheet';
import { Option, OptionType } from '@/utils/data';
import { RefObject, useCallback, useMemo } from 'react';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { View, Text } from '../Themed';

interface ISheetProps {
    children: React.ReactNode;
    list: Option[]
    onSheetChange: (index: number) => void;
    bottomSheetRef: RefObject<BottomSheet>;
    renderItem: ListRenderItem<OptionType>;
}

export default function Sheet(props: ISheetProps){
    const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

    const renderBackdrop = useCallback(
        (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={1}
            appearsOnIndex={2}
          />
        ),
        []
      );

      const renderSectionHeader = useCallback(
        ({ section }: { section: SectionListData<OptionType> }) => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.section_title}>{section.title}</Text>
          </View>
        ),
        []
      );
    

    return(
        <GestureHandlerRootView style={styles.container}>
            <>{props.children}</>
            <BottomSheet
                ref={props.bottomSheetRef}
                onChange={props.onSheetChange}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                enableOverDrag={true}
                handleIndicatorStyle={{ backgroundColor: '#007bff' }}
                containerStyle={{ padding: 10 }}
                index={-1}
                backdropComponent={renderBackdrop}
            >
            <BottomSheetSectionList
                sections={props.list ?? []}
                keyExtractor={(i) => i.id}
                renderSectionHeader={renderSectionHeader}
                renderItem={props.renderItem}
                contentContainerStyle={styles.contentContainer}
            />
            </BottomSheet>
        </GestureHandlerRootView>
    )
}



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 16,
  },
  contentContainer: {
    backgroundColor: 'white',
    padding: 6,
  },
  section_title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionHeaderContainer: {
    backgroundColor: 'white',
    padding: 6,
  },
});
