import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 16,
  },
  header_list: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  header_text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
  },
  separator: {
    height: 20,
  },
  content_notice: {
    borderWidth: 1,
    flexDirection: 'row',
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

  contentContainer: {
    backgroundColor: "white",
    padding: 6,
  },
  sectionHeaderContainer: {
    backgroundColor: "white",
    padding: 6,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    margin: 6,
    backgroundColor: "#007bff",
  },

  section_title: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    borderRadius: 8,
  },

});
