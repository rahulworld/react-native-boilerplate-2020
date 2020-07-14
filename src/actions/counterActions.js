import Api from '../helpers/ApiHelper';

// Increase Counter
export const increaseCounter = () => ({
  type: 'INCREASE_COUNTER',
});

// Decrease Counter
export const decreaseCounter = () => ({
  type: 'DECREASE_COUNTER',
});

// This axios api is working properly
export const getGithubUserRepositories = () => {
  // Api({
  //   method: 'get',
  //   url: 'https://api.github.com/users/rahulworld/repos',
  // }).then((resp) => {
  //   console.log(resp);
  // })
};