/*
 * https://github.com/jasonslyvia/react-marquee
 * remove PC
 * support React Element for text prop
*/

import * as React from 'react';
import {observable, action,computed,toJS} from 'mobx';
import {observer} from 'mobx-react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';
import BaseComponent from '../base/BaseComponent';

export interface MarqueeProp {
  prefixCls?: string;
  text: React.ReactNode;
  loop?: boolean;
  leading?: number;
  trailing?: number;
  className?: string;
  fps?: number;
  style:any;
}
@observer
class Marquee extends BaseComponent<MarqueeProp, any>{
  @observable _state = {
    animatedWidth: 0,
    overflowWidth: 0
  }

  _marqueeTimer;

  getDefaultProps() {
    return {
      text: '',
      loop: false,
      leading: 500,
      trailing: 800,
      fps: 40,
      className: '',
    };
  }
  constructor(props){
    super(props)
    this.changeState({
      animatedWidth: 0,
      overflowWidth: 0,
    })
  }

  componentDidMount() {
    this._measureText();
    this._startAnimation();
  }

  componentDidUpdate() {
    this._measureText();
    if (!this._marqueeTimer) {
      this._startAnimation();
    }
  }

  componentWillUnmount() {
    clearTimeout(this._marqueeTimer);
  }

  render() {
    const { prefixCls, className, text } = this.props;
    const style = assign({
      position: 'relative',
      right: this._state.animatedWidth,
      whiteSpace: 'nowrap',
      display: 'inline-block',
    }, this.props.style);
    return (
      <div className={`${prefixCls}-marquee-wrap ${className}`} style={{ overflow: 'hidden' }}>
        <div ref="text" className={`${prefixCls}-marquee`} style={style}>{text} </div>
      </div>
    );
  }

  _startAnimation() {
    clearTimeout(this._marqueeTimer);
    const TIMEOUT = 1 / this.props.fps * 1000;
    const isLeading = this._state.animatedWidth === 0;
    const timeout = isLeading ? this.props.leading : TIMEOUT;

    const animate = () => {
      const {overflowWidth} = this._state;
      let animatedWidth = this._state.animatedWidth + 1;
      const isRoundOver = animatedWidth > overflowWidth;

      if (isRoundOver) {
        if (this.props.loop) {
          animatedWidth = 0;
        } else {
          return;
        }
      }

      if (isRoundOver && this.props.trailing) {
        this._marqueeTimer = setTimeout(() => {
          this.changeState({
            animatedWidth,
          });

          this._marqueeTimer = setTimeout(animate, TIMEOUT);
        }, this.props.trailing);
      } else {
        this.changeState({
          animatedWidth,
        });

        this._marqueeTimer = setTimeout(animate, TIMEOUT);
      }
    };

    if (this._state.overflowWidth !== 0) {
      this._marqueeTimer = setTimeout(animate, timeout);
    }
  }

  _measureText() {
    const container = ReactDOM.findDOMNode(this);
    const node = ReactDOM.findDOMNode(this.refs.text);
    if (container && node) {
      const containerWidth = (container as any).offsetWidth;
      const textWidth = (node as any).offsetWidth;
      const overflowWidth = textWidth - containerWidth;
      if (overflowWidth !== this._state.overflowWidth) {
        this.changeState({
          overflowWidth,
        });
      }
    }
  }
};

export default Marquee;
