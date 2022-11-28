import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { COLORS, ARROW_ORIENTATIONS } from '../../constants';
import IconButton from './IconButton';

export default class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    };
  }

  componentDidMount() {
    const { isOpen } = this.props;
    if (isOpen) {
      this.setState({
        expanded: true,
      });
    }
  }

  render() {
    const {
      title,
      rightText,
      wrapperAvatarUri,
      wrapperAvatarStyle,
      accordionBody,
      disabled,
      isDarkMode,
    } = this.props;
    const rowStyle = {
      backgroundColor: isDarkMode ? COLORS.dark : COLORS.lighter,
    };

    const titleStyle = {
      color: isDarkMode ? COLORS.lighter : COLORS.darker,
    };

    return (
      <View
        style={[styles.accordionContainer, disabled ? styles.disabled : '']}
      >
        <TouchableOpacity
          style={[styles.row, rowStyle]}
          onPress={() => this.toggleExpand()}
          disabled={disabled}
        >
          <ImageBackground
            source={wrapperAvatarUri}
            style={wrapperAvatarStyle}
          />
          <Text
            style={[
              styles.title,
              styles.font,
              titleStyle,
              disabled ? styles.disabled : '',
            ]}
          >
            {title}
          </Text>
          {rightText !== null && (
            <Text style={[styles.title, styles.font, styles.rightText]}>
              {rightText}
            </Text>
          )}
          <View style={styles.arrowContainer}>
            <IconButton
              accessibilityLabel="accordionBtn"
              disabled={disabled}
              onPress={() => this.toggleExpand()}
              arrowOrientation={
                this.state.expanded
                  ? ARROW_ORIENTATIONS.UP
                  : ARROW_ORIENTATIONS.DOWN
              }
            />
          </View>
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {this.state.expanded && (
          <View style={[styles.child, rowStyle]}>{accordionBody}</View>
        )}
      </View>
    );
  }

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };
}

const styles = StyleSheet.create({
  arrowContainer: {
    right: 8,
    position: 'absolute',
  },
  accordionContainer: {
    marginTop: 12,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    borderWidth: 1,
    borderRadius: 2,
  },
  title: {
    fontSize: 18,
    marginLeft: 12,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: 'center',
    height: 48,
  },
  parentHr: {
    height: 1,
    width: '100%',
  },
  child: {
    padding: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.4)',
  },
  rightText: {
    position: 'absolute',
    right: 40,
  },
  disabled: {
    color: 'lightgrey',
  },
});
