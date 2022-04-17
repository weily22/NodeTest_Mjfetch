import mjFetch, { MjFetchApi } from 'mj-fetch';
import Code from './../Code/Code';
import Loading from './../Loading/Loading';
import './CustomDemo.scss';
import {useState} from "react";

const CustomDemo = () => {
  const [ showLoading, setShowLoading ] = useState(false)
  const customFetch = () => {
    return new MjFetchApi({
      headers: new Headers({
        'Authorization': 'xxxx-token'
      }),
      timeout: 10, // 单位是ms, 超时设置10ms为了便于测试
      middlewares: [(response) => { // 处理返回结果中间接，接受function数组
        if (response.code !== 0) {
          alert("未登录，请登录")
        }
        return response;
      }]
    })
  }

  const test = (token, timeout = 10) => {
    const myFetch = new MjFetchApi({
      timeout, // 单位是ms, 超时设置10ms为了便于测试
      headers: {
        'Authorization': token // 正确的token为 xm-token
      },
      middlewares: [(response) => { // 处理返回结果中间接，接受function数组
        if (response.code !== 0) {
          alert("未登录，请登录")
          return Promise.reject("验证失败")
        } else {
          return response;
        }
      }],
      before: () => {
        if (timeout > 10) { setShowLoading(true) }
      },
      after: () => {
        if (timeout > 10) { setShowLoading(false) }
      }
    })
    myFetch.get('http://localhost:3030/test').then((res) => {
      if (timeout <= 10) { alert("success: " + res.message) }
    }).catch((err) => {
      alert("err: " + err)
    })
  }

  return (
    <div className="custom-demo">
      <Code>
        <p className="notes">mj-fetch 暴露了一个MjFetchApi的接口，可用于自定义实例化对象</p>
        <p><b>const myFetch = new MjFetchApi(&#123;</b></p>
        <p className="tab">timeout: 10, <span className="notes">// 单位是ms, 超时设置10ms为了便于测试</span></p>
        <p className="tab">headers: &#123;</p>
        <p className="tab-4">'Authorization': token</p>
        <p className="tab">&#125;,</p>
        <p className="tab">middlewares: [(response) => &#123; <span className="notes">// 处理返回结果中间接，接受function数组</span></p>
        <p className="tab-4">if (response.code !== 0) &#123;</p>
        <p className="tab-6">alert("未登录，请登录")</p>
        <p className="tab-6">return Promise.reject("验证失败")</p>
        <p className="tab-4">&#125; else &#123;</p>
        <p className="tab-6">return response;</p>
        <p className="tab-4">&#125;</p>
        <p className="tab">&#125;],</p>
        <p className="tab">before: () => &#123;</p>
        <p className="tab-4">loading... </p>
        <p className="tab">&#125;,</p>
        <p className="tab">after: () => &#123;</p>
        <p className="tab-4">end loading... </p>
        <p className="tab">&#125;,</p>
        <p>&#125;)</p>
        <br/>
        <p><b>myFetch</b>.get('http://localhost:3030/test').then((res) => &#123;</p>
        <p className="tab">alert("success: " + res.message)</p>
        <p>}).catch((err) => &#123;</p>
        <p className="tab">alert("err: " + err)</p>
        <p>&#125;)</p>
      </Code>
      <div className="demo">
        <button className="mj_btn" onClick={() => test('xxx-token')}> token test 错误</button>
        <button className="mj_btn" onClick={() => test('xm-token')}> token test 正确</button>
        <button className="mj_btn" onClick={() => test('xm-token', 6000)}>
          Loading 测试， 建议打开控制台Network面板，网络选择 Fast 3G 测试 或 Slow 3G 测试</button>
      </div>
      <Loading show={showLoading}/>
    </div>
  )
}

export default CustomDemo;
