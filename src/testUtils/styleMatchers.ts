import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

type StyleType = ViewStyle | TextStyle;

interface StyledElement {
  props: {
    style: StyleType | StyleType[];
  };
}

export const expectViewStyleToMatch = (
  element: StyledElement,
  expectedStyle: Partial<ViewStyle>,
) => {
  const styles = StyleSheet.flatten(element.props.style);
  expect(styles).toMatchObject(expectedStyle);
};

export const expectTextStyleToMatch = (
  element: StyledElement,
  expectedStyle: Partial<TextStyle>,
) => {
  const styles = StyleSheet.flatten(element.props.style);
  expect(styles).toMatchObject(expectedStyle);
};
