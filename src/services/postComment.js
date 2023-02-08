import { makeRequest } from './makeRequest'

export const postComment = ({ postId, message, parentId }) => {
  return makeRequest(`posts/${postId}/comments`, {
    method: 'POST',
    data: { message, parentId },
  })
}
