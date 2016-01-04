'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} = React;

var { Icon, } = require('react-native-icons');

var CategoryTabBar = React.createClass({
  selectedTabIcons: [],
  unselectedTabIcons: [],

  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  },

  renderTabOption(name, page) {
    var isTabActive = this.props.activeTab === page;

    return (
      <TouchableOpacity key={name} onPress={() => this.props.goToPage(page)} style={styles.tab}>
        <Text style={styles.select}
              ref={(text) => { this.selectedTabIcons[page] = text }}>
              {name}
        </Text>
        <Text style={styles.normal}
              ref={(text) => { this.unselectedTabIcons[page] = text }}>
              {name}
        </Text>
      </TouchableOpacity>
    );
  },

  componentDidMount() {
    this.setAnimationValue({value: this.props.activeTab});
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({value}) {
    var currentPage = value; // this.props.activeTab;

    this.unselectedTabIcons.forEach((text, i) => {
      var textRef = text;
      if (!text.setNativeProps && text !== null) {
        // textRef = text.refs.icon_image
        // console.log('text native props: ' + text);
      }

      if (value - i >= 0 && value - i <= 1) {
        // console.log('1 value:' + value + ' i:' + i);
        textRef.setNativeProps({style: {opacity: value - i}});
      }

      if (i - value >= 0 &&  i - value <= 1) {
        // console.log('2 value:' + value + ' i:' + i);
        textRef.setNativeProps({style: {opacity: i - value}});
      }
    });
  },

  render() {
    var containerWidth = this.props.containerWidth;
    var numberOfTabs = this.props.tabs.length;

    // hide underline
    var tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth,// / numberOfTabs,
      height: 1,
      backgroundColor: '##1d101c',//'#3b5998',
      bottom: 0,
    };

    var left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, 1]// [0, containerWidth / numberOfTabs]
    });

    return (
      <View>
        <View style={styles.tabs}>
          {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
        </View>
        <Animated.View style={[tabUnderlineStyle, {left}]} />
      </View>
    );
  },
});

var styles = StyleSheet.create({
  tab: {
    // flex: 1,
    width:70,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    flex: 1,
    height: 45,
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  title: {
    // TODO: nested stylesheet
  },
  normal: {
    position: 'absolute',
    top: 10,
    left: 20,
    fontSize: 15,
    textAlign: 'center',
    color: '#666f77',
  },
  select: {
    position: 'absolute',
    top: 10,
    left: 20,
    fontSize: 15,
    textAlign: 'center',
    color: '#78d9dc',
  },
  icon: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 0,
    left: 20,
  },
});

module.exports = CategoryTabBar;
