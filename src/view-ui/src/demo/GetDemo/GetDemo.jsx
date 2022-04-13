import { useState, useEffect } from "react";
import mjFetch from 'mj-fetch';
import Code from './../Code/Code';
import './GetDemo.scss';

const GetDemo = () => {
  const [list, setList] = useState([]);

  const getUserList = () => {
    mjFetch.get('http://localhost:3030/user').then((res) => {
      if (res.status === 200) {
        setList(res.data);
      }
    }).catch((err) => alert(err))
  }
  const renderUserList = () => {
    if (list.length < 1) return null;
    return <ul className="demo_user">
      {list.map(({ id, name, age, hobby }) =>
        (<li key={id}><span>姓名：{name}</span><span>年龄：{age}</span><span>爱好 : {hobby}</span></li>)
      )}
    </ul>
  }
  return (
    <div className="get-demo">
      <Code>
        <p>方法一：</p>
        <p><b>mjFetch</b></p>
        <p className="tab"><b>.get</b>('your request url').then((res) => {`{`}</p>
        <p className="tab-4">...</p>
        <p className="tab">{`})`}</p>
        <p className="notes">//带参数param 例如: {`{`} id: 1 {`}`}，自动转换成 ?id=1</p>
        <p><b>mjFetch</b></p>
        <p className="tab"><b>.get</b>('your request url', param).then((res) => {`{`}</p>
        <p className="tab-4">...</p>
        <p className="tab">{`})`}</p>
      </Code>
      <hr/>
      <Code>
        <p>方法二：</p>
        <p><b>mjFetch</b></p>
        <p className="tab"><b>.fetch</b>{`({`}</p>
        <p className="tab-4">url: 'your request url',</p>
        <p className="tab-4">method: 'get',</p>
        <p className="tab-4">data: {`{`} name: xm {`}`}, <span className="notes">//带参数</span></p>
        <p className="tab">{`})`}.then((res) => {`{`}</p>
        <p className="tab-4">...</p>
        <p className="tab">{`})`}</p>
      </Code>
      <div className="demo">
        <button className="mj_btn" onClick={() => getUserList()}>获取用户列表 GET请求</button>
        {renderUserList()}
      </div>
    </div>
  )
}

export default GetDemo;