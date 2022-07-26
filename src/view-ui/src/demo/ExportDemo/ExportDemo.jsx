import { useState, useEffect } from "react";
import mjFetch from 'mj-fetch';
import Code from './../Code/Code';
import './ExportDemo.scss';

const ExportDemo = () => {
  const exportFunc = () => {
    mjFetch.fetch({
      method: 'GET',
      url: 'http://localhost:3030/export',
    }).then((response) => response.blob()).then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `导出测试.xlsx`;
      a.click();
    })
  }
  return <div className="export-demo">
    <Code>
      <p>导出代码：</p>
      <Code>
        <p><b>mjFetch</b></p>
        <p className="tab"><b>.fetch</b>{`({`}</p>
        <p className="tab-4">url: 'your request url',</p>
        <p className="tab-4">headers: {`{`}{`}`},</p>
        <p className="tab-4">withCredentials: true, <span className="notes"> // 开启 cookie 头部授权, 默认 true</span></p>
        <p className="tab-4">credentials: include, <span className="notes"> // 发送凭据方式，如果开启了 cookie 头部授权, 默认 include</span></p>
        <p className="tab-4">method: 'get',<span className="notes"> //post, delete, put</span></p>
        <p className="tab-4">data: {`{`} name: xm {`}`}, <span className="notes">//请求参数</span></p>
        <p className="tab-4">timeout: 6000, <span className="notes">// 超时请求设置，单位毫秒</span></p>
        <p className="tab">{`})`}.then((res) => (response) => response.blob()).then((blob)=>{`{`}</p>
        <p className="tab-4">const url = window.URL.createObjectURL(new Blob([blob]));</p>
        <p className="tab-4">const a = document.createElement('a');</p>
        <p className="tab-4">a.href = url;</p>
        <p className="tab-4">a.download = 导出.xlsx;</p>
        <p className="tab-4">a.click();</p>
        <p className="tab">{`})`}</p>
      </Code>
    </Code>
    <div className="demo">
      <div><button className="mj_btn" onClick={() => exportFunc()}>导出</button></div>
      <table>
        <thead><tr><th>项目名称</th><th>开始日期</th><th>是否延期</th><th>数量</th></tr></thead>
        <tbody>
          <tr><td>a项目</td><td>2018-04-01</td><td>是</td><td>1</td></tr>
          <tr><td>b项目</td><td>2020-04-01</td><td>否</td><td>2</td></tr>
          <tr><td>c项目</td><td>2022-07-26</td><td>否</td><td>3</td></tr>
          <tr><td>d项目</td><td>-</td><td>是</td><td>4</td></tr>
        </tbody>
      </table>
    </div>
  </div>
}

export default ExportDemo;
