import { makeRequest } from './makeRequest'

export const postComment = ({ postId, message, parentId }) => {
  return makeRequest(`posts/${postId}/comments`, {
    method: 'POST',
    data: { message, parentId },
  })
}

export const updateComment = ({ postId, message, commentId }) => {
  return makeRequest(`posts/${postId}/comments/${commentId}`, {
    method: 'PUT',
    data: { message },
  })
}

export const deleteComment = ({ postId, commentId }) => {
  return makeRequest(`/posts/${postId}/comments/${commentId}`, {
    method: 'DELETE',
  })
}

export const toggleCommentLike = ({ postId, commentId }) => {
  return makeRequest(`/posts/${postId}/comments/${commentId}/toggleLike`, {
    method: 'POST',
  })
}
