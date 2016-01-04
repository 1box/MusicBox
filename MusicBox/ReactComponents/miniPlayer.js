'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} = React;

var {AudioRecorder, AudioPlayer} = require('react-native-audio');
var { Icon, } = require('react-native-icons');

var Progress = require('react-native-progress');

var PLAY_BUTTON_BG_WIDTH = 50;
var PLAY_BUTTON_WIDTH = 30;
var PLAY_BUTTON_MARGIN = 15;

var MiniPlayer = React.createClass({

  getInitialState() {
    return {
      currentTime: 0.0,
      recording: false,
      stoppedRecording: false,
      stoppedPlaying: false,
      playing: false,
      finished: false,
      progress: 0,
    }
  },
  componentDidMount() {
    AudioRecorder.prepareRecordingAtPath('/test.caf')
    AudioRecorder.onProgress = (data) => {
      this.setState({currentTime: Math.floor(data.currentTime)});
    };
    AudioRecorder.onFinished = (data) => {
      this.setState({finished: data.finished});
      console.log(`Finished recording: ${data.finished}`)
    };
  },

  _renderButton: function(title, onPress, active) {
    var style = (active) ? styles.activeButtonIcon : styles.buttonIcon;
    var color = (active) ? '#75d3dd' : '#c0c1c0';

    return (
      <TouchableHighlight style={styles.button} onPress={onPress} underlayColor='null'>
        <Icon
          name='ion|record'
          size={PLAY_BUTTON_BG_WIDTH}
          color='#353337'
          style={styles.buttonIconBg}>
          <Icon
            name={title}
            size={PLAY_BUTTON_WIDTH}
            color={color}
            style={style}
          />
        </Icon>
      </TouchableHighlight>);
    // <Text style={style}>
    //   {title}
    // </Text>
  },

  _pause: function() {
    if (this.state.recording)
      AudioRecorder.pauseRecording();
    else if (this.state.playing) {
      AudioRecorder.pausePlaying();
    }
  },

  _stop: function() {
    if (this.state.recording) {
      AudioRecorder.stopRecording();
      this.setState({stoppedRecording: true, recording: false});
    } else if (this.state.playing) {
      AudioRecorder.stopPlaying();
      this.setState({playing: false, stoppedPlaying: true});
    }
  },

  _record: function() {
    AudioRecorder.startRecording();
    this.setState({recording: true, playing: false});
  },

 _play: function() {
    if (this.state.recording) {
      this._stop();
      this.setState({recording: false});
    }
    AudioRecorder.playRecording();
    this.setState({playing: true});
  },

  _refresh() {
    console.log('refreshing...');
  },

  render: function() {
    setTimeout((function() {
      this.setState({ progress: this.state.progress + (0.4 * Math.random())});
    }).bind(this), 1000);

    return (
      // <Text style={styles.progressText}>{this.state.currentTime}s</Text>
      // {this._renderButton('ion|ios-refresh-empty', () => {this._record()}, this.state.recording )}

      <View style={styles.container}>
        <View style={styles.songName}>
          <Text style={styles.songNameText}>"I've Never Been before / Chet Baker"</Text>
        </View>
        <Progress.Bar
          style={styles.progress}
          progress={this.state.progress}
          unfilledColor={'#707982'}
          color={'#55ddfd'}
          borderWidth={0.5}
          borderColor={'#000'}
          width={300}
          height={3}
          borderRadius={0.5}
        />
        <View style={styles.controls}>
          <TouchableHighlight style={styles.button} onPress={this._refresh()} underlayColor='null'>
            <Icon
              name='ion|ios-refresh-empty'
              size={PLAY_BUTTON_WIDTH}
              color='#353337'
              style={styles.buttonIconBg}>
            </Icon>
          </TouchableHighlight>
          {this._renderButton('ion|stop', () => {this._stop()} )}
          {this._renderButton('ion|pause', () => {this._pause()} )}
          {this._renderButton('ion|ios-play-outline', () => {this._play()}, this.state.playing )}
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "red",
  },
  songName: {
    // flex: 1,
    top: 10,
    height: 40,
    backgroundColor: "green",
  },
  songNameText: {
    fontSize: 15,
    color: "#fff",
    backgroundColor: "orange",
  },
  prgress: {
    // flex: 1,
    position: 'relative',
    top: 20,
    height: 20,
    backgroundColor: "blue",
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    // position: 'relative',
    top: 10,
    bottom: 20,
    justifyContent: 'center',
    // backgroundColor: "pink",
  },
  // progressText: {
  //   paddingTop: 10,
  //   fontSize: 30,
  //   color: "#fff"
  // },
  button: {
    // padding: 10
  },
  // disabledButtonText: {
  //   color: '#eee'
  // },
  buttonIconBg: {
    color: '#fff',
    width: PLAY_BUTTON_BG_WIDTH,
    height: PLAY_BUTTON_BG_WIDTH,
  },
  buttonIcon: {
    flex: 1,
    margin: PLAY_BUTTON_MARGIN,
  },
  activeButtonIcon: {
    flex: 1,
    margin: PLAY_BUTTON_MARGIN,
    // width: PLAY_BUTTON_WIDTH,
    // height: PLAY_BUTTON_WIDTH,
  }

});

module.exports = MiniPlayer;
