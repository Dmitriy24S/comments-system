import React, { useContext, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAsync } from '../hooks/useAsync'
import { getPost } from '../services/getPosts'

// v1
export const PostContext = React.createContext()
// v2
export function usePostContext() {
  return useContext(PostContext)
}

export function PostProvider({ children }) {
  const { id } = useParams()
  // console.log('PostProvider, id:', id) // PostProvider, id: 90c83e3a-1d92-4dd0-9812-f5e7209532fc

  const [refetchPost, setRefetchPost] = useState(false)

  function refreshPost() {
    setRefetchPost(true)
  }

  function resetRefreshPostState() {
    setRefetchPost(false)
  }

  // const { loading, error, value: post } = useAsync(() => getPost(id), [id])
  const {
    loading,
    error,
    value: post,
  } = useAsync(() => getPost(id), resetRefreshPostState, [id, refetchPost]) // rerun when post id changes (open post page) / when update refetchPost status (after submit comment post)

  console.log('PostProvider, getPost -> post:', post)
  // body:
  // "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam, est quos ullam earum porro saepe impedit quisquam magnam inventore perspiciatis voluptatem commodi sapiente repellendus animi?"
  // comments: (3) [{…}, {…}, {…}]
  // title: "Post1"

  // with id obj:
  // {post: {…}} (2x post:?)
  // post:
  // body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam, est quos ullam earum porro saepe impedit quisquam magnam inventore perspiciatis voluptatem commodi sapiente repellendus animi?"
  // comments: (3) [{…}, {…}, {…}]
  // id: "90c83e3a-1d92-4dd0-9812-f5e7209532fc"
  // title: "Post1"

  // Comments logic:
  // performance only want update when post is changed/updated?
  const commentsByParentId = useMemo(() => {
    if (post?.comments == null) return [] // ! not work with === ? ==
    const group = {}
    post.comments.forEach((comment) => {
      group[comment.parentId] ||= [] // if exists -> do nothing || otherwise if not exist -> create array
      group[comment.parentId].push(comment)
    })
    return group
  }, [post?.comments])
  console.log('commentsByParentId:', commentsByParentId)
  // {
  // 6470ac89-e9b5-4c6d-8638-93726904119a: [{…}]
  // null: (2) [{…}, {…}]
  // }

  function getReplies(parentId) {
    return commentsByParentId[parentId]
  }

  return (
    <PostContext.Provider
      value={{
        post: {
          id,
          ...post,
        },
        rootComments: commentsByParentId[null],
        getReplies,
        refreshPost,
      }}
    >
      {loading && <h1>Loading</h1>}
      {error && <h1>{error}</h1>}
      {post && children}
    </PostContext.Provider>
  )
}
