import { Link } from 'react-router-dom'
import { useAsync } from '../hooks/useAsync'
import { getPosts } from '../services/postsApi'

const PostList = () => {
  // const [posts, setPosts] = useState([])

  // useEffect(() => {
  //   getPosts().then(setPosts)
  // }, [])

  const { loading, error, value: posts } = useAsync(getPosts) // useQuery?

  if (loading) return <h1>Loading</h1>
  if (error) return <h1>{error}</h1>

  return posts.map((post) => (
    <h1 key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </h1>
  ))
}

export default PostList
