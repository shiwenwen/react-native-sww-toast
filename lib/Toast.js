/**
 * Created by Shiwenwen on 16/9/28.
 */

import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Dimensions,
  Animated,
  Easing,

} from 'react-native';
import RootSiblings from 'react-native-root-siblings';
const DURATION = 2000;
var TimerMixin = require('react-timer-mixin');
var {width, height} = Dimensions.get('window');

export default class Toast extends Component {
  /**
   * 显示toast
   * @param message 文字消息
   * @param location toast位置 上('top'),中('center'),下('bottom')，默认'center'
   * @param touchTohidden 是否点击toast直接隐藏 默认false
   * @returns {SiblingsManager}
   */
  static show(message,location='center',touchTohidden=false) {
   return new RootSiblings(<ToastContent
      message={message}
      location={location}
      touchTohidden={touchTohidden}
    />)
  }

};


/**
 * toast视图模块
 */
var ToastContent = React.createClass({
  //注册倒计时
  mixins: [TimerMixin],
  timer:null,
  getInitialState(){
    return {
      opacity:new Animated.Value(0),
    };
  },
    propTypes:{
    message:React.PropTypes.string.isRequired,
    location:React.PropTypes.oneOf(['top','center','bottom']),
    touchTohidden:React.PropTypes.bool
  },

  render(){
    return(

        <Animated.View style={[styles.background,{justifyContent:this._getLocation(),opacity:this.state.opacity}]}>
          <View style={styles.textView}>
            <Text style={styles.text}
                onPress={()=>{

                  if (this.props.touchTohidden) {
                    this._hide(0)
                  }
                }}
            >{this.props.message}</Text>
          </View>
        </Animated.View>

    );
  },

  componentDidMount() {
    this._show(250);
  },
  componentWillUnmount(){
    this._hide();
  },

  _show(duration){
    Animated.timing(this.state.opacity,{
      toValue: 1,
      duration: duration,
      easing: Easing.out(Easing.ease)
    }).start(({finished})=>{

      if(finished){
        this.timer = this.setTimeout(()=>{
            this._hide()
          this.clearTimeout(this.timer)
        },DURATION)
      }
    })

  },

  _hide(duration=250){

    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: duration,
      easing: Easing.in(Easing.ease)
    }).start(({finished})=>{
      if(finished){

        this.props.siblingManager.destroy()
      }
    });
  },
  _getLocation(){
    if (this.props.location == 'top'){
      return 'flex-start'
    }else if (this.props.location == 'center'){
      return 'center'
    }else {
      return 'flex-end'
    }

  }


})

const styles = StyleSheet.create({
  background:{
    backgroundColor:'rgba(1,1,1,0.05)',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    width:width,
    height:height,
    left:0,
    top:0,
    paddingTop:100,
    paddingBottom:100,
    paddingLeft:30,
    paddingRight:30

  },
  textView:{
    borderRadius:5,
    backgroundColor:'rgba(0,0,0,0.6)',
  },
  text:{

    borderRadius:5,
    color:'white',
    fontSize:15,
    padding:15
  }


});
