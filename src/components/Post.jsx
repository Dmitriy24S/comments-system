import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { PostContext, usePostContext } from '../context/PostContext'
import { useAsyncFn } from '../hooks/useAsync'
import CommentList from './CommentList'

const Post = () => {
  // v1
  // const post = useContext(PostContext)
  // const { post } = useContext(PostContext)
  // v2
  const { post, rootComments } = usePostContext()
  console.log('Post - post:', post)
  // {post: {…}} (2x post:?)
  // post:
  // body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam, est quos ullam earum porro saepe impedit quisquam magnam inventore perspiciatis voluptatem commodi sapiente repellendus animi?"
  // comments: (3) [{…}, {…}, {…}]
  // id: "90c83e3a-1d92-4dd0-9812-f5e7209532fc"
  // title: "Post1"
  console.log('Post rootComments', rootComments)

  return (
    <>
      <Link to='/'>Home</Link>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <h3>Comments</h3>
      <section>
        {rootComments != null && rootComments.length > 0 && (
          <div className='comments-container'>
            <CommentList comments={rootComments} />
          </div>
        )}
      </section>
    </>
  )
}

export default Post
