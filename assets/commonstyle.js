import { StyleSheet } from 'react-native';

const CommonStyle = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    height: 56,
    paddingHorizontal: 16,
    elevation: 4,
  },
  toolbarButton: {
    color: '#fff',
    fontSize: 18,
  },
  toolbarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CommonStyle;