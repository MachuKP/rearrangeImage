import {useCallback, useLayoutEffect, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {UploadFileNavigationProp, RearrangeRouteProp} from '../App';
import {useRoute} from '@react-navigation/native';
import {DataType} from '../Config';

interface Props {
  navigation: UploadFileNavigationProp;
}

const UploadFilePage = ({navigation}: Props) => {
  const [document, setDocument] = useState<DataType[]>([]);
  const [rearrangeDocument, setRearrangeDocument] = useState<DataType[]>([]);
  const route = useRoute<RearrangeRouteProp>();

  useLayoutEffect(() => {
    if (route.params?.data) {
      setRearrangeDocument(route.params?.data);
    }
  }, [route.params]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
      });

      const itemArray = response.map(value => {
        return {id: value.name as string, uri: value.uri};
      });
      setDocument(itemArray || []);

      navigation.navigate('rearrange', {
        data: itemArray,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <View style={styles.appContainer}>
      <Button title="Select 📑" onPress={handleDocumentSelection} />
      <FlatList
        data={rearrangeDocument}
        renderItem={({item}) => <Text>{item.id}</Text>}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});

export default UploadFilePage;
