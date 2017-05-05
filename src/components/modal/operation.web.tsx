/* tslint:disable:no-unused-variable */
import createElement from 'inferno-create-element';
import {unmountComponentAtNode} from "inferno-compat";
import {render} from "inferno";
import Modal from './Modal.web';


export default function (...args) {
    const actions = args[0] || [{text: '确定'}];

    const prefixCls = 'am-modal';
    let div: any = document.createElement('div');
    document.body.appendChild(div);

    function close() {
        unmountComponentAtNode(div);
        div.parentNode.removeChild(div);
    }

    const footer = actions.map((button) => {
        const orginPress = button.onPress || function () {
            };
        button.onPress = () => {
            const res = orginPress();
            if (res && res.then) {
                res.then(() => {
                    close();
                });
            } else {
                close();
            }
        };
        return button;
    });

    render(
        <Modal
            visible
            operation
            transparent
            prefixCls={prefixCls}
            transitionName="am-zoom"
            closable={false}
            maskClosable
            onClose={close}
            footer={footer}
            maskTransitionName="am-fade"
            className="am-modal-operation"
        />, div
    );

    return {
        close,
    };
}
