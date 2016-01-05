/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
 AppRegistry,
 StyleSheet,
 TabBarIOS,
 Text,
 View,
 StatusBarIOS,
 Dimensions,
} = React;

var Home = require('./ReactComponents/home.ios');
var IPod = require('./ReactComponents/ipod.ios');
var Hot = require('./ReactComponents/hot.ios');
var Search = require('./ReactComponents/search.ios');
var More = require('./ReactComponents/more.ios');

var { TabBarIOS, } = require('react-native-icons');
var TabBarItemIOS = TabBarIOS.Item;

var TAB_BAR_ITEM_ICON_SIZE = 24;
var TAB_BAR_HEIGHT = 44;
var SCREEN_WIDTH = Dimensions.get('window').width;
var SCREEN_HEIGHT = Dimensions.get('window').height;

var MusicBox = React.createClass({
  getInitialState: function() {
    return {
      selectedTab: 'home',
      notifCount: 0,
      presses: 0,
    };
  },
  componentWillMount() {
    StatusBarIOS.setHidden(true, false);
  },
  _renderContent: function() {
      var retCom = null;
      if (this.state.selectedTab === 'home') {
        retCom = <Home />;
      } else if (this.state.selectedTab === 'ipod') {
        retCom = <IPod />;
      } else if (this.state.selectedTab === 'hot') {
        retCom = <Hot />;
      } else if (this.state.selectedTab === 'search') {
        retCom = <Search />;
      } else if (this.state.selectedTab === 'more') {
        retCom = <More />;
      };

      return (
        <View style={styles.container}>
          <View style={styles.banner}>
          </View>
          {retCom}
        </View>
      );
  },
  render: function () {
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}
        tintColor={'#61dcdd'}
        barTintColor={'#1d1c1f'}
        styles={styles.tabBar}>
        <TabBarItemIOS
          name="home"
          iconName={'ion|social-snapchat-outline'}
          selectedIconName={'ion|social-snapchat'}
          title={'电台'}
          iconSize={TAB_BAR_ITEM_ICON_SIZE}
          accessibilityLabel="Home Tab"
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home',
            });
          }}>
          {this._renderContent()}
        </TabBarItemIOS>
        <TabBarItemIOS
            name="ipod"
            iconName={'ion|music-note'}
            selectedIconName={'ion|music-note'}
            title={'iPod'}
            iconSize={TAB_BAR_ITEM_ICON_SIZE}
            accessibilityLabel="iPod Tab"
            selected={this.state.selectedTab === 'ipod'}
            onPress={() => {
            this.setState({
              selectedTab: 'ipod',
            });
          }}>
          {this._renderContent()}
        </TabBarItemIOS>
        <TabBarItemIOS
            name="hot"
            iconName={'ion|trophy'}
            selectedIconName={'ion|trophy'}
            title={'排行榜'}
            iconSize={TAB_BAR_ITEM_ICON_SIZE}
            accessibilityLabel="Hot Tab"
            selected={this.state.selectedTab === 'hot'}
            onPress={() => {
            this.setState({
              selectedTab: 'hot',
            });
          }}>
          {this._renderContent()}
        </TabBarItemIOS>
        <TabBarItemIOS
            name="search"
            iconName={'ion|ios-search-strong'}
            selectedIconName={'ion|ios-search-strong'}
            title={'搜索'}
            iconSize={TAB_BAR_ITEM_ICON_SIZE}
            accessibilityLabel="Search Tab"
            selected={this.state.selectedTab === 'search'}
            onPress={() => {
            this.setState({
              selectedTab: 'search',
            });
          }}>
          {this._renderContent()}
        </TabBarItemIOS>
        <TabBarItemIOS
            name="more"
            iconName={'ion|ios-gear-outline'}
            selectedIconName={'ion|ios-gear'}
            title={'设置'}
            iconSize={TAB_BAR_ITEM_ICON_SIZE}
            accessibilityLabel="More Tab"
            selected={this.state.selectedTab === 'more'}
            onPress={() => {
            this.setState({
              selectedTab: 'more',
            });
          }}>
          {this._renderContent()}
        </TabBarItemIOS>
      </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  tabbar: {
    height: TAB_BAR_HEIGHT,
  },
  // tabContent: {
  //   flex: 1,
  //   alignItems: 'center',
  // },
  tabText: {
    color: 'white',
    margin: 50,
  },
  banner: {
    width: SCREEN_WIDTH,
    height: 40,
    backgroundColor: 'black'
  },
  container: {
    backgroundColor: '#000',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT - TAB_BAR_HEIGHT,
  }
});

AppRegistry.registerComponent('MusicBox', () => MusicBox);
