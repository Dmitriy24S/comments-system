export const useUser = () => {
  console.log('document cookie', document.cookie)
  return { id: document.cookie.match(/userId=(?<id>[^;]+)/).groups.id }
}
// pull out userId from cookie
