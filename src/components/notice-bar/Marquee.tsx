/*
 * https://github.com/jasonslyvia/react-marquee
 * remove PC
 * support React Element for text prop
 */

import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import {findDOMNode, VNode} from "inferno";
import {observable} from 'mobx';
import assign from 'object-assign';
import BaseComponent from '../base/BaseComponent';


export interface MarqueeProp {
    prefixCls?: string;
    text: VNode;
    loop?: boolean;
    leading?: number;
    trailing?: number;
    className?: string;
    fps?: number;
    style: any;
}

@observer
class Marquee extends BaseComponent<MarqueeProp, any> {

    @observable _state = {
        animatedWidth: 0,
        overflowWidth: 0
    }

    _marqueeTimer;
    text;
    textBind = (text) => {
        this.text = text;
    }

    static defaultProps = {
        text: '',
        loop: false,
        leading: 500,
        trailing: 800,
        fps: 40,
        className: '',
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
        const {prefixCls, className, text} = this.props;
        const style = assign({
            position: 'relative',
            right: this._state.animatedWidth,
            whiteSpace: 'nowrap',
            display: 'inline-block',
        }, this.props.style);
        return (
            <div className={`${prefixCls}-marquee-wrap ${className}`} style={{overflow: 'hidden'}}>
                <div ref={this.textBind} className={`${prefixCls}-marquee`} style={style}>{text} </div>
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
        const container = findDOMNode(this);
        const node = findDOMNode(this.text);
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
}
;

export default Marquee;
