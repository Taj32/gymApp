// ./ScalingDot.tsx
import React from 'react';
import { StyleSheet, ViewStyle, useWindowDimensions } from 'react-native';
import Animated, {
  interpolate,
  Extrapolation,
  interpolateColor,
  useAnimatedStyle,
  SharedValue,
} from 'react-native-reanimated';
import { ScalingDotProps } from '@/components/PagingDots';

type Props = {
  index: number;
  scrollX: SharedValue<number>;
  dotStyle?: ViewStyle;
  inActiveDotOpacity?: number;
  inActiveDotColor?: string;
  activeDotScale?: number;
  activeDotColor?: string;
};

const ScalingDot = ({
  scrollX,
  index,
  dotStyle,
  inActiveDotOpacity,
  inActiveDotColor,
  activeDotScale,
  activeDotColor,
}: Props) => {
  const defaultProps = {
    inActiveDotColor: inActiveDotColor || '#347af0',
    activeDotColor: activeDotColor || '#347af0',
    animationType: 'scale',
    inActiveDotOpacity: inActiveDotOpacity || 0.5,
    activeDotScale: activeDotScale || 1.4,
  };
  const { width } = useWindowDimensions();
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const opacityOutputRange = [defaultProps.inActiveDotOpacity, 1, defaultProps.inActiveDotOpacity];
  const scaleOutputRange = [1, defaultProps.activeDotScale, 1];

  const colorOutputRange = [
    defaultProps.inActiveDotColor,
    defaultProps.activeDotColor,
    defaultProps.inActiveDotColor,
  ];

  const extrapolation = {
    extrapolateRight: Extrapolation.CLAMP,
    extrapolateLeft: Extrapolation.CLAMP,
  };

  // One shared value drives all three animations.
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollX.value,
      inputRange, 
      opacityOutputRange,
      extrapolation,
    ),
    backgroundColor: interpolateColor(
      scrollX.value,
      inputRange,
      colorOutputRange,
    ),
    transform: [
      {
        scale: interpolate(
          scrollX.value,
          inputRange,
          scaleOutputRange,
          extrapolation,
        ),
      },
    ],
  }));

  return (
    <Animated.View
      key={`dot-${index}`}
      style={[styles.dotStyle, dotStyle, animatedStyle]}
    />
  );
};

const styles = StyleSheet.create({
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default ScalingDot;