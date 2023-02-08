import React, { useState } from 'react'
import { FaEdit, FaHeart, FaReply, FaTrash } from 'react-icons/fa'
import { usePostContext } from '../context/PostContext'
import { useAsyncFn } from '../hooks/useAsync'
import { postComment, updateComment } from '../services/commentApi'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import IconButton from './IconButton'

// const dateFormatter = new Intl.DateTimeFormat('en-us', {
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
})
// dynamic undefined locale

const Comment = ({ comment }) => {
  const { post, getReplies, refreshPost } = usePostContext()
  const childComments = getReplies(comment.id)
  const [areChildrenHidden, setAreChildrenHidden] = useState(true)
  const [isReplying, setIsReplying] = useState(false)
  const [isEditingComment, setIsEditingComment] = useState(false)

  function toggleReplying() {
    setIsReplying((prev) => !prev)
  }

  function toggleEditing() {
    setIsEditingComment((prev) => !prev)
  }

  // Reply to comment:
  // createCommentFn = postComment = ({ postId, message, parentId }) => {
  const { loading, error, execute: createCommentFn } = useAsyncFn(postComment) // get fn (createCommentFn) -> to pass for reply submit form

  function handleCreateReply(message) {
    // have parentId (passing comment id of comment to which replying) = create reply to comment
    return createCommentFn({ postId: post.id, message, parentId: comment.id }).then(
      (comment) => {
        console.log('create reply', comment)
        setIsReplying(false)
        refreshPost()
      }
    )
  }

  // Update comment:
  const updateCommentFn = useAsyncFn(updateComment)
  // console.log('updateCommentFn', updateCommentFn)
  // error: undefined
  // execute: async (...params) => {…}
  // loading: false
  // value: undefined

  // TODO: refactor?
  // updateComment.execute = updateComment = ({ postId, message, commentId }) => {
  // const handleUpdateComment = () => {
  const handleUpdateComment = (newMessageValue) => {
    return updateCommentFn
      .execute({ postId: post.id, message: newMessageValue, commentId: comment.id })
      .then((comment) => {
        console.log('update comment', comment)
        setIsEditingComment(false)
        refreshPost()
      })
  }

  return (
    <div className='comment-container'>
      <div key={comment.id} className='comment'>
        <div className='comment-header'>
          <h4>{comment.user.name}</h4>
          {/* <p>{comment.createdAt}</p> */}
          <p>{dateFormatter.format(Date.parse(comment.createdAt))}</p>
        </div>
        {isEditingComment ? (
          <div className=''>
            <CommentForm
              autoFocus
              initialValue={comment.message}
              loading={updateCommentFn.loading}
              error={updateCommentFn.error}
              onSubmit={handleUpdateComment}
            />
          </div>
        ) : (
          <p>{comment.message}</p>
        )}
        <div className='comment-actions'>
          <IconButton Icon={FaHeart} aria-label='Like'>
            2
          </IconButton>
          <IconButton
            Icon={FaReply}
            aria-label={isReplying ? 'Close Reply' : 'Reply'}
            onClick={toggleReplying}
          />
          <IconButton
            Icon={FaEdit}
            aria-label={isEditingComment ? 'Close Edit' : 'Edit'}
            title={isEditingComment ? 'Close Edit' : 'Edit'}
            onClick={toggleEditing}
          />
          <IconButton Icon={FaTrash} aria-label='Delete' />
        </div>
      </div>
      {isReplying && (
        // <div className='mt-2'>
        <div className='mt-2 ml-2'>
          <CommentForm loading={loading} error={error} onSubmit={handleCreateReply} />
        </div>
      )}
      {/* Comment replies */}
      {childComments?.length > 0 && (
        <>
          <div
            className={[
              'nested-comments-stack',
              areChildrenHidden ? 'hide' : 'show',
            ].join(' ')}
          >
            <button
              aria-label='hide replies'
              className='collapse-line-button'
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className='nested-comments'>
              <CommentList comments={childComments} />
            </div>
          </div>
          <button
            className={['button', 'mt-2', areChildrenHidden ? 'show' : 'hide'].join(' ')}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show replies
          </button>
        </>
      )}
    </div>
  )
}

export default Comment
