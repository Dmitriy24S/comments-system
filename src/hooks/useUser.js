export const useUser = () => {
  console.log('document cookie', document.cookie)
  const userId = document.cookie.match(/userId=(?<id>[^;]+)/)?.groups?.id

  // return { id: document.cookie.match(/userId=(?<id>[^;]+)/).groups.id }
  return userId || null
}
// pull out userId from cookie
