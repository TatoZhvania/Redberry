import BlogDetail from './pages/BlogDetail';
import BlogForm from './pages/BlogForm';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="max-w-[1920px] mx-auto bg-[#F3F2FA]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blog-form" element={<BlogForm />} />
      </Routes>
    </div>
  );
}

export default App;
