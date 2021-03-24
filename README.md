# react-native-reanimated-accordion

A React Native accordion component that run at 60 fps, even on low-end devices.

![Screenshot of React Native accordion](https://firebasestorage.googleapis.com/v0/b/publicimage-6ea8e.appspot.com/o/ezgif.com-gif-maker.gif?alt=media&token=d1fa5eac-21a1-41e8-a32f-7b972d6c8d98)

## Installation

1. Run: `$ npm install --save react-native-vector-icons`
2. As [react-native-reanimated](https://github.com/software-mansion/react-native-reanimated) and [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) are peer dependencies, ensure you have them installed and linked properly. Check peer dependencies on package.json file make sure correct version installed.

## Usage

```js
import Accordion from "react-native-reanimated-accordion";

const App = () => (
  <Accordion
    headerComponent={
      <View>
        <Text>Header</Text>
      </View>
    }
    bodyComponent={
      <View
        style={{
          backgroundColor: "green",
          width: "100%",
          height: 500
        }}
      >
        <Text>Content</Text>
      </View>
    }
  />
);
```
