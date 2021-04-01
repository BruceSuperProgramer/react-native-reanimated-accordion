# react-native-reanimated-accordion

A React Native accordion component that run at 60 fps, even on low-end devices.

![Screenshot of React Native accordion](https://firebasestorage.googleapis.com/v0/b/publicimage-6ea8e.appspot.com/o/react-native-reanimated-accordion.gif?alt=media&token=e82f5e45-74d2-4c99-a3df-c47267bdd046)

## Installation

1. Run: `$ npm install --save react-native-reanimated-accordion or yarn add react-native-reanimated-accordion`
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
