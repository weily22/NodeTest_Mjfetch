import {useEffect, useState} from "react";
import mjFetch from 'mj-fetch';
import './App.css';

const userObj = {
  zhangsan: { name: '张三', age: '22', hobby: '狂徒' },
  liSi: { name: '李四', age: '18', hobby: '打牌' },
  wangWu: { name: '王五', age: '38', hobby: '钓鱼' },
  zhaoLiu: { name: '赵六', age: '16', hobby: '麻将' },
}

function App() {
  const [userList, setUserList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    getUserList();
  }, [])
  const getUserList = () => {
    mjFetch.get("http://localhost:3030/user").then((res) => {
      if (res.status === 200) {
        setUserList(res.data)
      }
    })
  }
  const getUserById = (id) => {
    mjFetch.get("http://localhost:3030/user", { id }).then((res) => {
      console.log('res', res)
      if (res.status === 200) {
        setUserInfo(res.data)
      }
    })
  }
  const deleteUsersById = (id) => {
    if (!id) return false;
    mjFetch.fetch({
      url: `http://localhost:3030/user/${id}`,
      method: 'Delete',
    }).then((res) => {
      if (res.status === 200) {
        alert(res.message)
      }
    })
  }
  const addUser = (userInfo) => {
    mjFetch.post('http://localhost:3030/user', userInfo).then((res) => {
      if (res.status === 200) {
        alert("添加成功： " + JSON.stringify(res.data))
      }
    })
  }

  const renderUserInfo = () => {
    if (!userInfo.name) return null;
    return (
      <div className="box">
        <p style={{fontWeight: 'bold'}}>查询到的 {userInfo.name} 的信息</p>
        <p>姓名: {userInfo.name}</p>
        <p>年龄: {userInfo.age}</p>
        <p>爱好: {userInfo.hobby}</p>
      </div>
    )
  }
  const renderTestPost = () => {
    return (
      <div className="box">
        <p style={{fontWeight: 'bold'}}>测试post请求添加人员</p>
        { Object.keys(userObj).map((item) => (
          <p key={item}>
            <span>姓名: {userObj[item].name}，年龄：{userObj[item].age}，爱好：{userObj[item].hobby} </span>
            <span className="td-btn" onClick={() => addUser(userObj[item]) }> 添加</span>
          </p>
        )) }
      </div>
    )
  }
  return (
    <div className="App">
      <div className="user-list">
        <table border="true">
          <thead><tr><th colSpan="4">用户列表</th></tr></thead>
          <tbody>
            { userList.map((item) => (
              <tr key={item.id}>
                <td>姓名：{item.name}</td>
                <td>年龄：{item.age}</td>
                <td>爱好：{item.hobby}</td>
                <td>
                  <span className="td-btn" onClick={() => getUserById(item.id)}>查询</span>
                  <span className="td-btn" onClick={() => deleteUsersById(item.id)}>删除</span>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
        { renderUserInfo() }
        { renderTestPost() }
      </div>
      <div className="user-one">
      </div>
    </div>
  );
}

export default App;
