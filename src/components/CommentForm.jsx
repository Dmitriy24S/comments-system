import React, { useState } from 'react'

const CommentForm = ({
  loading,
  error,
  onSubmit,
  initialValue = '',
  autoFocus = false,
}) => {
  const [value, setValue] = useState(initialValue)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('handle submit, value:', value)
    onSubmit(value).then(() => setValue(''))
  }

  // console.log('error:', error)
  // error: Route POST:/post/90c83e3a-1d92-4dd0-9812-f5e7209532fc/comments not found

  return (
    <form onSubmit={handleSubmit} className='comment-form'>
      <div className='comment-input-container'>
        <textarea
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className='comment-input'
        />
        <button className='button' type='submit' disabled={loading}>
          {loading ? 'Loading' : 'Post'}
        </button>
      </div>
      {error && <p className='error-text'>Error: {error}</p>}
    </form>
  )
}

export default CommentForm
