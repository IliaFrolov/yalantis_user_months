
export const GetUsers = () => {
  return fetch("https://yalantis-react-school-api.yalantis.com/api/task0/users")
        .then(res => res.json())
}