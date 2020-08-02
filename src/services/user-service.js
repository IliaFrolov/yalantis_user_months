export const GetUsers = () => fetch('https://yalantis-react-school-api.yalantis.com/api/task0/users')
  .then((res) => res.json());
// .then(console.log('fetch'))
