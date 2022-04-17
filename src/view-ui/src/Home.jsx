import { Routes, Route, Link } from "react-router-dom"
import GetDemo from './demo/GetDemo/GetDemo';
import PostDemo from './demo/PostDemo/PostDemo';
import UploadDemo from './demo/UploadDemo/UploadDemo';
import FetchDemo from "./demo/FetchDemo/FetchDemo";
import CustomDemo from "./demo/CustomDemo/CustomDemo";

import './Home.scss';
const SL = ['get', 'post', 'upload', 'fetch', 'custom'];
const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        { SL.map((item) => <Link key={item} to={`/${item}`}><span>{item} 示例</span></Link>) }
      </header>
      <pre className="home_pre">import mjFetch from 'mj-fetch'; <span>// 引用方式</span></pre>
      <main className="home_main">
        <Routes>
          <Route path="/get" element={<GetDemo/>}/>
          <Route path="/post" element={<PostDemo/>}/>
          <Route path="/upload" element={<UploadDemo/>}/>
          <Route path="/fetch" element={<FetchDemo/>}/>
          <Route path="/custom" element={<CustomDemo/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default Home;