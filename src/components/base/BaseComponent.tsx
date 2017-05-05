import createElement from 'inferno-create-element';
import Component from 'inferno-component';
import {observer} from 'inferno-mobx';
import {action, observable, toJS} from 'mobx';
import assign from 'object-assign';

@observer
export default class BaseComponent<P, S> extends Component<P, S> {

    @observable public _state: S;

    @action
    public changeState(state: S, callback?: () => void): S {
        this._state = assign({}, toJS(this._state), state);
        if (typeof callback === 'function') {
            callback.call(this);
        }
        return this._state;
    }
}
