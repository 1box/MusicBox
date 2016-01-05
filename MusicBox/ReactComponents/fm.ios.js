'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  Component,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Image,
  Navigator,
} = React;

var ScrollableTabView = require('react-native-scrollable-tab-view');
var CategoryTabBar = require('./categoryTabBar');
var MiniPlayer = require('./miniPlayer')

var { Icon, } = require('react-native-icons');

var TOP_BAR_HEIGHT = 45;
var SCREEN_WIDTH = Dimensions.get('window').width;
var SCREEN_HEIGHT = Dimensions.get('window').height;

var BaseConfig = Navigator.SceneConfigs.FloatFromRight;

var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
	snapVelocity: 8,
	edgeHitWidth: SCREEN_WIDTH,
});

var CustomSceneConfig = Object.assign({}, BaseConfig, {
	springTension: 100,
	springFriction: 1,

	gestures: {
		pop: CustomLeftToRightGesture,
	}
});

var CategoryListView = React.createClass({
  render() {
    return (
      <View style={styles.card}>
        <View style={styles.coverContainer}>
          <Image
            style = {styles.cover}
            source = {require('../Resources/img/cover_default.png')}
          />
        </View>
      </View>
    );
  },
});

var Fm = React.createClass({
  _onPressButton() {
    // show player
    this.props.navigator.push({id: 2,})
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upper}>
          <ScrollableTabView  alwaysBounceVertical={false} initialPage={0} renderTabBar={() => <CategoryTabBar />}>
            <ScrollView tabLabel="轻音乐" style={styles.tabView} alwaysBounceVertical={false}>
              <CategoryListView />
            </ScrollView>
            <ScrollView tabLabel="咖啡" style={styles.tabView} alwaysBounceVertical={false}>
              <CategoryListView />
            </ScrollView>
            <ScrollView tabLabel="乡村" style={styles.tabView} alwaysBounceVertical={false}>
              <CategoryListView />
            </ScrollView>
          </ScrollableTabView>
          <View style={styles.record}>
            <TouchableHighlight
              onPress={this._onPressButton}
              underlayColor='null'>
              <Icon
                name='ion|ipod'
                size={TOP_BAR_HEIGHT-10}
                color='#616971'
                style={styles.ipod}
              />
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.lower}>
          <MiniPlayer style={styles.miniPlayer} />
        </View>
      </View>
    );
  }
});

// var SimpleExample = React.createClass({
//   render() {
//     return (
//       <ScrollableTabView style={{marginTop: 20}}>
//         <Text tabLabel='Tab #1'>My</Text>
//         <Text tabLabel='Tab #2'>favorite</Text>
//         <Text tabLabel='Tab #3'>project</Text>
//       </ScrollableTabView>
//     )
//   }
// });

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'orange',
  },
  upper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#000',
  },
  lower: {
    flex: 1,
    height: 140,
    backgroundColor: '#000',
  },
  record: {
    // flex: 1,
    top: 0,
    right: 0,
    position: 'absolute',
    height: TOP_BAR_HEIGHT,
    // opacity: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    // alignSelf: 'flex-end',
  },
  ipod: {
    margin: 5,
    width: TOP_BAR_HEIGHT-10,
    height: TOP_BAR_HEIGHT-10,
  },
  description: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  test: {
    width: 50,
    height: 30,
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    flex: 1,
    // borderWidth: 1,
    backgroundColor: '#000',
    // borderColor: 'rgba(0,0,0,0.1)',
    // margin: 5,
    height: SCREEN_WIDTH,
    // padding: 15,
    // shadowColor: '#ccc',
    // shadowOffset: {width: 2, height: 2},
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverContainer: {
    flex: 1,
    // top: 30,
    // margin: 30,
  },
  cover: {
    flex: 1,
    width: 380,
    // height: 220,
    backgroundColor: 'rgba(0,0,0,0.01)',
    resizeMode: Image.resizeMode.stretch,
  },
  miniPlayer: {
    flex: 1,
    backgroundColor: 'blue',
    // height: 200,
  },
});

module.exports = Fm;
