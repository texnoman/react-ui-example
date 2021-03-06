import { compose, toPairs, forEach } from 'ramda'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import userReducers from '../modules/User/reducers/highOrderReducers'
import authReducers from '../modules/Auth/reducers/highOrderReducers'
import snackbarReducer, { SNACKBAR_STATE } from '../components/Snackbar/reducer'
import confirmDialogReducer, { CONFIRM_DIALOG_STATE } from '../components/ConfirmDialog/reducer'
import pageLoadingReducer from '../components/PageLoading/reducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    form: formReducer,
    routing: routerReducer,
    [SNACKBAR_STATE]: snackbarReducer(),
    pageLoading: pageLoadingReducer(),
    [CONFIRM_DIALOG_STATE]: confirmDialogReducer(),
    ...userReducers,
    ...authReducers,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export const injectReducers = (store, reducers) => {
  compose(
    forEach(([key, reducer]) => injectReducer(store, { key, reducer })),
    toPairs,
  )(reducers)
}
