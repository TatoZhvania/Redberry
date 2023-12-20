import BlogDetail from './pages/BlogDetail';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="max-w-[1920px] mx-auto bg-[#F3F2FA]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  );
}

export default App;
