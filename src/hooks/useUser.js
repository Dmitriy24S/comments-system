export const useUser = () => {
  return { id: document.cookie.match(/userId=(?<id>[^;]+)/).groups.id }
}
// pull out userId from cookie
