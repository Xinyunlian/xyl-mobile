import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import Button from '../button/index';
import classNames from 'classnames';
import ResultProps from './PropsType';

@observer
export default class Result extends Component<ResultProps, any> {
    static defaultProps = {
        prefixCls: 'am-result',
        buttonType: '',
        buttonClick: () => {
        },
    };

    render() {
        const {prefixCls, className, img, imgUrl, title, message, buttonText, buttonClick, buttonType} = this.props;
        const wrapCls = classNames({
            [`${prefixCls}`]: true,
            [className as string]: className,
        });

        let imgContent: any = null;
        if (img) {
            imgContent = <div className={`${prefixCls}-pic`}>{img}</div>;
        } else if (imgUrl) {
            imgContent = <div className={`${prefixCls}-pic`} style={{backgroundImage: `url(${imgUrl})`}}/>;
        }

        return (
            <div className={wrapCls}>
                {imgContent}
                {title ? <div className={`${prefixCls}-title`}>{title}</div> : null }
                {message ? <div className={`${prefixCls}-message`}>{message}</div> : null }
                {buttonText ? <div className={`${prefixCls}-button`}>
                    <Button type={buttonType} onClick={buttonClick}>{buttonText}</Button>
                </div> : null }
            </div>
        );
    }
}
