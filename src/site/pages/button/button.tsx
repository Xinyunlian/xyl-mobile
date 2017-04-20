import React from 'react';
import ReactDom from 'react-dom';
import style from './button.css'
import Button from '../../../components/button/index.web'
import 'components/button/style/index.web';
import ReactMarkdown  from 'react-markdown';

var input = `
### 大按钮
对当前页面整体的即时操作，用于鼓励用户操作的按钮，必须有效且满足用户需求。

**属性**

按钮固定高度为88-94之间圆角大小固定为12px。
*主按钮操作在一个页面中只能出现一次。

`;

export default class ButtonDoc extends React.Component < any,any > {
    render() {
        return (
           <div >
               
               <ReactMarkdown source={input} />
               <Button type="primary">主页面操作 Normal</Button>
            </div>
        );
    } 
}