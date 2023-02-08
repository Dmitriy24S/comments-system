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