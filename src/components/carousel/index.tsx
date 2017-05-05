import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import {observable, action} from 'mobx';
import classNames from 'classnames';
import ReactCarousel from 'nuka-carousel';
import assign from 'object-assign';
import CarouselProps from './PropsType';

@observer
export default class Carousel extends Component<CarouselProps, any> {
    static defaultProps = {
        prefixCls: 'am-carousel',
        dots: true,
        arrows: false,
        autoplay: false,
        infinite: false,
        edgeEasing: 'linear',
        cellAlign: 'center',
        selectedIndex: 0,
    };
    @observable selectedIndex = null;

    @action changeSelectedIndex(selectedIndex, callback?: Function) {
        this.selectedIndex = selectedIndex;
        callback();
    }

    constructor(props) {
        super(props);
        this.changeSelectedIndex(this.props.selectedIndex);
    }

    onChange = (index) => {
        this.changeSelectedIndex(index, () => {
            if (this.props.afterChange) {
                this.props.afterChange(index);
            }
        });
    }

    render() {
        const {className, prefixCls} = this.props;
        let props = assign({}, this.props);
        props = assign(props, {
            wrapAround: props.infinite,
            slideIndex: props.selectedIndex,
            beforeSlide: props.beforeChange,
        });

        let Decorators: any[] = [];
        const current = this.selectedIndex;
        if (props.dots) {
            Decorators = [{
                component: ({slideCount, slidesToScroll}) => {
                    const arr: number[] = [];
                    for (let i = 0; i < slideCount; i += slidesToScroll) {
                        arr.push(i);
                    }
                    const dotDom = arr.map(function (index) {
                        const dotCls = classNames({
                            [`${prefixCls}-wrap-dot`]: true,
                            [`${prefixCls}-wrap-dot-active`]: index === current,
                        });
                        return (
                            <div className={dotCls} key={index}>
                                <span />
                            </div>
                        );
                    });
                    return (
                        <div className={`${prefixCls}-wrap`}>
                            {dotDom}
                        </div>
                    );
                },
                position: 'BottomCenter',
            }];
        }

        ['infinite', 'selectedIndex', 'beforeChange', 'afterChange', 'dots'].forEach(prop => {
            if (props.hasOwnProperty(prop)) {
                delete props[prop];
            }
        });

        const wrapCls = classNames({
            [className as string]: className,
            [prefixCls as string]: true,
            [`${prefixCls}-vertical`]: props.vertical,
        });

        return (
            <ReactCarousel
                {...props}
                className={wrapCls}
                decorators={Decorators}
                afterSlide={this.onChange}
            />
        );
    }
}
