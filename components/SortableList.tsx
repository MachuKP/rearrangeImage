import {ReactElement} from 'react';
import {COL, SIZE, Positions} from '../Config';
import Item from './Item';
import {useSharedValue} from 'react-native-reanimated';
import { ScrollView } from 'react-native';
// import { useAppDispatch } from '../store/store';
// import { setDataOrder, dataOrder } from '../store/features/orderSlice';

interface ListProps {
  children: ReactElement<{id: string}>[];
  getNewPosition: (diff: Positions) => void;
}

const SortableList = ({children, getNewPosition}: ListProps) => {
  // const scrollY = useSharedValue(0);

  // const dispatch = useAppDispatch();

  const positions = useSharedValue<Positions>(
    Object.assign(
      {},
      ...children.map((child, index) => ({[child.props.id]: index})),
    ),
  );

  // const onChangePosition = (position: dataOrder) => {
  //   dispatch(setDataOrder(position))
  // }

  return (
    <ScrollView
      contentContainerStyle={{
        height: Math.ceil(children.length / COL) * SIZE,
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}>
      {children.map(child => {
        return (
          <Item getNewPosition={getNewPosition} key={child.props.id} id={child.props.id} positions={positions}>
            {child}
          </Item>
        );
      })}
    </ScrollView>
  );
};

export default SortableList;
