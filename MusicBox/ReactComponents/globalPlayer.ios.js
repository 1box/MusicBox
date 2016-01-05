'use strict';
var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Navigator,
	TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Image,
} = React;

var MiniPlayer = require('./miniPlayer')
var { Icon, } = require('react-native-icons');

var SCREEN_WIDTH = Dimensions.get('window').width;
var TOP_BAR_HEIGHT = 45;

var GlobalPlayer = React.createClass({
	_handlePress() {
		this.props.navigator.pop();
	},

	render() {
		return (
			<View style={[styles.container]}>
        <View style={styles.upper}>
          <View style={styles.topbar}>
            <TouchableHighlight
              onPress={this._handlePress}
              underlayColor='null'
              style={styles.back}>
              <Icon
                name='ion|android-arrow-back'
                size={TOP_BAR_HEIGHT-10}
                color='#bdbdbd'
                style={styles.back}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.coverContainer}>
            <Image
              style = {styles.cover}
              source = {require('../Resources/img/cover_default.png')}
            />
          </View>
        </View>
        <View style={styles.lower}>
          <MiniPlayer style={styles.miniPlayer} />
        </View>
			</View>
		)
	},
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  upper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000',
  },
  lower: {
    flex: 1,
    height: 140,
    backgroundColor: '#000',
  },
  topbar: {
    width: SCREEN_WIDTH,
    height: TOP_BAR_HEIGHT,
    // backgroundColor: 'orange',
  },
  back: {
    top: 0,
    left: 0,
    position: 'absolute',
    width: TOP_BAR_HEIGHT,
    height: TOP_BAR_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  arrow: {
    margin: 5,
    width: TOP_BAR_HEIGHT-10,
    height: TOP_BAR_HEIGHT-10,
  },
  coverContainer: {
    flex: 1,
  },
  cover: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: 380,
    backgroundColor: 'rgba(0,0,0,0.01)',
    resizeMode: Image.resizeMode.stretch,
  },
  miniPlayer: {
    flex: 1,
    backgroundColor: 'blue',
    // height: 200,
  },
});

module.exports = GlobalPlayer;
