import React, { useState } from 'react'
import { FaEdit, FaHeart, FaReply, FaTrash } from 'react-icons/fa'
import { usePostContext } from '../context/PostContext'
import CommentList from './CommentList'
import IconButton from './IconButton'

// const dateFormatter = new Intl.DateTimeFormat('en-us', {
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
})
// dynamic undefined locale

const Comment = ({ comment }) => {
  const { getReplies } = usePostContext()
  const childComments = getReplies(comment.id)
  const [areChildrenHidden, setAreChildrenHidden] = useState(true)

  return (
    <div className='comment-container'>
      <div key={comment.id} className='comment'>
        <div className='comment-header'>
          <h4>{comment.user.name}</h4>
          {/* <p>{comment.createdAt}</p> */}
          <p>{dateFormatter.format(Date.parse(comment.createdAt))}</p>
        </div>
        <p>{comment.message}</p>
        <div className='comment-actions'>
          <IconButton Icon={FaHeart} aria-label='Like'>
            2
          </IconButton>
          <IconButton Icon={FaReply} aria-label='Reply' />
          <IconButton Icon={FaEdit} aria-label='Edit' />
          <IconButton Icon={FaTrash} aria-label='Delete' />
        </div>
      </div>
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
