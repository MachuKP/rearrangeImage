import React from 'react';
// lib
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// component
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RearrangeFilePage from './page/RearrangeFilePage';
import UploadFilePage from './page/UploadFilePage';

import {StackNavigationProp} from '@react-navigation/stack';
import {ParamsType} from './Config';

import {store} from './store/store';
import {Provider} from 'react-redux';
import {ActivityIndicator} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  uploadFile?: ParamsType;
  rearrange?: ParamsType;
};

export type UploadFileNavigationProp = StackNavigationProp<
  RootStackParamList,
  'uploadFile'
>;

export type RearrangeNavigationProp = StackNavigationProp<
  RootStackParamList,
  'rearrange'
>;

const linking = {
  prefixes: ['peoplesapp://'],
};

export type RearrangeRouteProp = RouteProp<RootStackParamList, 'rearrange'>;
export type UploadFileRouteProp = RouteProp<RootStackParamList, 'uploadFile'>;

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <NavigationContainer
          linking={linking}
          fallback={<ActivityIndicator color="blue" size="large" />}>
          <Stack.Navigator>
            <Stack.Screen name="uploadFile" component={UploadFilePage} />
            <Stack.Screen
              options={{headerShown: false}}
              name="rearrange"
              component={RearrangeFilePage}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
