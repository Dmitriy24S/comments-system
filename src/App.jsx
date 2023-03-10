import { Route, Routes } from 'react-router-dom'
import Post from './components/Post'
import PostList from './components/PostList'
import { PostProvider } from './context/PostContext'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<PostList />} />
        <Route
          path='/posts/:id'
          element={
            <PostProvider>
              <Post />
            </PostProvider>
          }
        />
      </Routes>
    </div>
  )
}

export default App
