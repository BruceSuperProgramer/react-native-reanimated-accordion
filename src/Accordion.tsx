import * as React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";

interface Accordion {
  headerComponent: React.ReactNode;
  bodyComponent: React.ReactNode;
}

const Accordion = ({ headerComponent, bodyComponent }: Accordion) => {
  const aref = useAnimatedRef<View>();
  const open = useSharedValue(false);
  const height = useSharedValue(0);
  const progress = useDerivedValue(() =>
    open.value ? withTiming(1) : withTiming(0)
  );

  const bodyContainerDynamicStyle = useAnimatedStyle(() => {
    return {
      height: height.value * progress.value + 0.1,
      opacity: progress.value === 0 ? 0 : 1
    };
  });

  const renderCollapseIcon = () => {
    const dynamicStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotate: `${progress.value * 180}deg` }]
      };
    });
    return (
      <>
        <TouchableOpacity
          style={styles.chevronIcon}
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
        <View style={styles.headerContent}>
          {headerComponent}
          <>{renderCollapseIcon()}</>
        </View>
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
    width: "100%",
    flexDirection: "row"
  },
  headerContent: {
    width: "100%"
  },
  bodyContainer: { width: "100%", overflow: "hidden" },
  bodyContent: { width: "100%" },
  chevronIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    alignSelf: "center"
  }
});

export default Accordion;
