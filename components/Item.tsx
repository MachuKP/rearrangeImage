import React, {ReactNode} from 'react';
// import {Dimensions} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  // COL,
  Positions,
  SIZE,
  animationConfig,
  getOrder,
  getPosition,
} from '../Config';
import {SharedValue} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import { dataOrder } from '../store/features/orderSlice';

type ItemProps = {
  children: ReactNode;
  id: string;
  positions: SharedValue<Positions>;
  getNewPosition: (data: dataOrder) => void;
}

const Item = ({children, positions, id, getNewPosition}: ItemProps) => {
  // container value
  // const inset = useSafeAreaInsets();
  // const containerHeight =
  //   Dimensions.get('window').height - inset.top - inset.bottom;
  // const contentHeight = (Object.keys(positions).length / COL) * SIZE;

  // postion value
  const position = getPosition(positions.value[id]!);

  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);

  // gesture value
  const isGestureActive = useSharedValue(false);

  useAnimatedReaction(
    () => positions.value[id],
    newOrder => {
      const newPositions = getPosition(newOrder);
      translateX.value = withTiming(newPositions.x, animationConfig);
      translateY.value = withTiming(newPositions.y, animationConfig);
    },
  );

  // gesture function
  const panGesture = Gesture.Pan()
    .onBegin(() => {
      isGestureActive.value = true;
    })
    .onTouchesMove(event => {
      translateX.value = event.allTouches[0].absoluteX - SIZE / 2;
      translateY.value = event.allTouches[0].absoluteY - SIZE / 2;
      const oldOrder = positions.value[id];
      const newOrder = getOrder(translateX.value, translateY.value);
      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions.value).find(
          key => positions.value[key] === newOrder,
        );
        if (idToSwap) {
          const newPositions: dataOrder = {...positions.value};
          newPositions[id] = newOrder;
          newPositions[idToSwap] = oldOrder;
          positions.value = newPositions;
          runOnJS(getNewPosition)(newPositions);
        }
      }
    })
    .onFinalize(() => {
      const destination = getPosition(positions.value[id]);
      translateX.value = withTiming(destination.x, animationConfig, () => {
        isGestureActive.value = false;
      });
      translateY.value = withTiming(destination.y, animationConfig);
    });

  const style = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 10 : 1;
    return {
      position: 'absolute',
      left: 0,
      top: 0,
      width: SIZE,
      height: SIZE,
      zIndex,
      transform: [
        {translateX: translateX.value || 0},
        {translateY: translateY.value || 0},
      ],
    };
  });
  return (
    <Animated.View style={style}>
      <GestureDetector gesture={panGesture}>
        <Animated.View>{children}</Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};

export default Item;
