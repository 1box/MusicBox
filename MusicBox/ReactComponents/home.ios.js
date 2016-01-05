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

var Fm = require('./fm')
var GlobalPlayer = require('./globalPlayer')

var SCREEN_WIDTH = require('Dimensions').get('window').width;
var BaseConfig = Navigator.SceneConfigs.VerticalUpSwipeJump;

// var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
// 	snapVelocity: 8,
// 	edgeHitWidth: SCREEN_WIDTH,
// });
//
// var CustomSceneConfig = Object.assign({}, BaseConfig, {
// 	springTension: 100,
// 	springFriction: 1,
//
// 	gestures: {
// 		pop: CustomLeftToRightGesture,
// 	}
// });

var Home = React.createClass({
	_renderScene(route, navigator) {
		if (route.id === 1) {
			return <Fm navigator={navigator} />
		} else if (route.id === 2) {
			return <GlobalPlayer navigator={navigator} />
		}
	},

	_configureScene(route) {
		return BaseConfig;//CustomSceneConfig;
	},

	render() {
		return (
			<Navigator
				initialRoute={{id: 1, }}
				renderScene={this._renderScene}
				configureScene={this._configureScene} />
		);
	}
});

var styles = StyleSheet.create({
	// container: {
	// 	flex: 1,
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	backgroundColor: '#000',
	// },
});

module.exports = Home;
