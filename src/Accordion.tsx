import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import { PADDING } from "./config";

interface Accordion {
  headerComponent: React.ReactNode;
  bodyComponent: React.ReactNode;
}

const Accordion = ({ headerComponent, bodyComponent }: Accordion) => {
  const aref = useAnimatedRef<View>();
  const open = useSharedValue(false);
  const height = useSharedValue(0);
  const progress = useDerivedValue(() =>
    open.value ? withSpring(1) : withTiming(0)
  );

  const bodyContainerDynamicStyle = useAnimatedStyle(() => {
    return {
      height: height.value * progress.value + 1,
      opacity: progress.value === 0 ? 0 : 1
    };
  });

  const renderCollapseIcon = () => {
    const dynamicStyle = useAnimatedStyle(() => {
      const rotate = interpolate(
        progress.value,
        [0, 1],
        [0, 180],
        Extrapolate.CLAMP
      );
      return {
        transform: [{ rotate: `${rotate}deg` }]
      };
    });
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            if (height.value === 0) {
              runOnUI(() => {
                "worklet";
                height.value = measure(aref).height;
              })();
            }
            open.value = !open.value;
          }}
        >
          <Animated.View style={dynamicStyle}>
            <FontAwesomeIcons name="chevron-down" />
          </Animated.View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>{headerComponent}</View>
        {renderCollapseIcon()}
      </View>
      <Animated.View style={[styles.bodyContainer, bodyContainerDynamicStyle]}>
        <View ref={aref} style={styles.bodyContent}>
          {bodyComponent}
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: PADDING,
    width: "100%",
    flexDirection: "row"
  },
  headerContent: {
    flex: 1
  },
  bodyContainer: { width: "100%", overflow: "hidden" },
  bodyContent: { width: "100%" }
});

export default Accordion;
