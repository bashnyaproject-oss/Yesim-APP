import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {AppProvider} from './context/AppContext';
import {AppNavigator} from './navigation/AppNavigator';
import {COLORS} from './utils/constants';
import 'react-native-gesture-handler';

const App: React.FC = () => {
  return (
    <AppProvider>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.surface}
          translucent={false}
        />
        <AppNavigator />
      </View>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});

export default App;

