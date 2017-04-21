import React from 'react';
import ReactDom from 'react-dom';
import style from './App.css'
import ButtonDoc from './pages/button/button'
import 'components/button/style/index';
import ReactMarkdown  from 'react-markdown';



class App extends React.Component < any,any > {
    render() {
        return (
           <div className={style.div}>
                <ButtonDoc/>
            </div>
        );
    } 
}

ReactDom.render(
    <App></App>, document.getElementById('app'));