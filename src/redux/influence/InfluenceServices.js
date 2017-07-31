import * as actions from './InfluenceAction';

const fetchUser = () => (dispatch) => {
  dispatch(actions.resetState())
  fetch('http://test-digital-pages.azurewebsites.net/api/user.js')
    .then((resp) => resp.json())
    .then((data) => {
      dispatch(actions.updateUser(data))
    })
    .catch(error => {
      console.log('ERROR', error);
    });
}


const fetchBrand = () => (dispatch) => {
  dispatch(actions.resetState())
  fetch('http://test-digital-pages.azurewebsites.net/api/brand.js')
    .then((resp) => resp.json())
    .then((data) => {
      dispatch(actions.updateBrand(data))
    })
    .catch(error => {
      console.log('ERROR', error);
    });
}

const fetchIterator = () => (dispatch) => {
  dispatch(actions.resetState())
  fetch('http://test-digital-pages.azurewebsites.net/api/iterator.js')
    .then((resp) => resp.json())
    .then((data) => {
      dispatch(actions.updateIterator(data))
    })
    .catch(error => {
      console.log('ERROR', error);
    });
}

const resetState = () => (dispatch) => {
  dispatch(actions.resetState())
}

export default {
  fetchUser,
  fetchBrand,
  fetchIterator,
  resetState
}
