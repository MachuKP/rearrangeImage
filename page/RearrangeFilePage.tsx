import {Platform, StyleSheet, View} from 'react-native';
import SortableList from '../components/SortableList';
import Tile from '../components/Tile';
import {MARGIN, DataType} from '../Config';
import {RearrangeNavigationProp, RearrangeRouteProp} from '../App';
import {useLayoutEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import Footer from '../components/Footer';
import {useAppSelector, useAppDispatch} from '../store/store';
import {resetDataOrder} from '../store/features/orderSlice';

interface Props {
  navigation: RearrangeNavigationProp;
}

type keyData = {
  [key: number]: string
}

type stringObject = {
  [key: string]: number;
}

const RearrangeFilePage = ({navigation}: Props) => {
  const [dataArray, setDataArray] = useState<DataType[]>();
  const [dragData, setDragData] = useState<stringObject>({});
  const route = useRoute<RearrangeRouteProp>();

  const dispatch = useAppDispatch();
  const orderData = useAppSelector(state => state.orderData.dataOrder);

  useLayoutEffect(() => {
    setDataArray(route.params?.data);
  }, [route.params]);

  function swapKeysAndValues(obj: any) {
    const swapped = Object.entries(obj).map(
      ([key, value]) => [value, key]
    );
    return Object.fromEntries(swapped);
  }

  const onSubmit = () => {
    dispatch(resetDataOrder());
    const keyData:keyData  = swapKeysAndValues(orderData)
    const rearrangeData:DataType[] = [];
    for (let i = 0; i < Object.keys(keyData).length; i++) {
      let matchData = dataArray?.find(data => data.id === keyData[i])
      rearrangeData.push({id: keyData[i], uri: matchData?.uri!})
    }
    navigation.navigate('uploadFile', {data: rearrangeData})
  }

  const getPosition = (positions: stringObject) => {
    console.log('newPosition', positions);
    setDragData(positions);
  };

  return (
    <View style={styles.SafeAreaContainer}>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          {dataArray && (
            <SortableList getNewPosition={(positions) => getPosition(positions)}>
              {dataArray.map((data: DataType) => (
                <Tile
                  onLongPress={() => true}
                  key={data.id}
                  id={data.id}
                  uri={data.uri}
                />
              ))}
            </SortableList>
          )}
        </View>
      </View>
      <Footer onClick={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  SafeAreaContainer: {
    marginTop: Platform.OS === 'ios' ? 50 : 30,
    flex: 1,
    backgroundColor: '#fff',
  },
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: MARGIN,
    backgroundColor: '#e6e6e6',
  },
});

export default RearrangeFilePage;
