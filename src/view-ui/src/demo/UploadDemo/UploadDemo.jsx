import { useRef } from 'react';
import mjFetch from 'mj-fetch';
import './UploadDemo.scss';
import Code from "../Code/Code";

const UploadDemo = () => {
  const fileRef = useRef();
  const uploadFile = () => {
    const fileObj = fileRef.current && fileRef.current.files[0];
    const fd = new FormData();
    fd.append('username', 'xm_test');
    fd.append('file', fileObj);
    mjFetch.form('http://localhost:3030/upload', fd).then((res = {}) => {
      if (res.status === 200) {
        alert("上传成功：" + JSON.stringify(res.data));
      } else {
        alert(res.message)
      }
    }).catch((err) => alert(err))
  }
  return (
    <div className="upload-demo">
      <Code>
        <p>方法一：</p>
        <p>const fd = new FormData();</p>
        <p>fd.append('name', 'xm');</p><br/>
        <p><b>mjFetch</b></p>
        <p className="tab"><b>.form</b>('your request url', fd).then((res) => {`{`}</p>
        <p className="tab-4">...</p>
        <p className="tab">{`})`}</p>
      </Code>
      <hr/>
      <input id="file" type="file" ref={fileRef}/>
      <button onClick={uploadFile}>上传</button>
    </div>
  )
}

export default UploadDemo;