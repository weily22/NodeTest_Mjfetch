import { useState, useEffect } from "react";
import mjFetch from 'mj-fetch';
import Code from './../Code/Code';
import './FetchDemo.scss';

const FetchDemo = () => {
  return (
    <div className="fetch-demo">
      <Code>
        <p className="notes">Fetch用法：</p>
        <p><b>mjFetch</b></p>
        <p className="tab"><b>.fetch</b>{`({`}</p>
        <p className="tab-4">url: 'your request url',</p>
        <p className="tab-4">headers: {`{`}{`}`},</p>
        <p className="tab-4">withCredentials: true, <span className="notes"> // 开启 cookie 头部授权, 默认 true</span></p>
        <p className="tab-4">credentials: include, <span className="notes"> // 发送凭据方式，如果开启了 cookie 头部授权, 默认 include</span></p>
        <p className="tab-4">method: 'get',<span className="notes"> //post, delete, put</span></p>
        <p className="tab-4">data: {`{`} name: xm {`}`}, <span className="notes">//请求参数</span></p>
        <p className="tab-4">timeout: 6000, <span className="notes">// 超时请求设置，单位毫秒</span></p>
        <p className="tab">{`})`}.then((res) => {`{`}</p>
        <p className="tab-4">...</p>
        <p className="tab">{`})`}</p>
      </Code>
    </div>
  )
}

export default FetchDemo;