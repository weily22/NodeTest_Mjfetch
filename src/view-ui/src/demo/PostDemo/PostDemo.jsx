import mjFetch from 'mj-fetch';
import Code from './../Code/Code';
import './PostDemo.scss';

const userObj = {
  zhangsan: { name: '张三', age: '22', hobby: '狂徒' },
  liSi: { name: '李四', age: '18', hobby: '打牌' },
  wangWu: { name: '王五', age: '38', hobby: '钓鱼' },
  zhaoLiu: { name: '赵六', age: '16', hobby: '麻将' },
}
const PostDemo = () => {
  const addUser = (userInfo) => {
    mjFetch.post('http://localhost:3030/user', userInfo).then((res) => {
      if (res.status === 200) {
        alert("添加成功： " + JSON.stringify(res.data))
      }
    })
  }
  return (
    <div className="post-demo">
      <Code>
        <p>方法一：</p>
        <p><b>mjFetch</b></p>
        <p className="tab"><b>.post</b>('your request url', data).then((res) => {`{`}</p>
        <p className="tab-4">...</p>
        <p className="tab">{`})`}</p>
      </Code>
      <hr/>
      <Code>
        <p>方法二：</p>
        <p><b>mjFetch</b></p>
        <p className="tab"><b>.fetch</b>{`({`}</p>
        <p className="tab-4">url: 'your request url',</p>
        <p className="tab-4">method: 'post',</p>
        <p className="tab-4">data: {`{`} name: xm {`}`}, <span className="notes">//带参数</span></p>
        <p className="tab">{`})`}.then((res) => {`{`}</p>
        <p className="tab-4">...</p>
        <p className="tab">{`})`}</p>
      </Code>
      <div className="demo">
        <div className="demo_user_info">
          { Object.keys(userObj).map((item) => (
            <p key={item}>
              <span>姓名: {userObj[item].name}，年龄：{userObj[item].age}，爱好：{userObj[item].hobby} </span>
              <button className="mj_btn" onClick={() => addUser(userObj[item])}> 添加{userObj[item].name}</button>
            </p>
          )) }
        </div>
      </div>
    </div>
  )
}

export default PostDemo;