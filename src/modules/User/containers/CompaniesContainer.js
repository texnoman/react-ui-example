import * as R from 'ramda'
import { compose, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import Companies from '../components/Companies'
import * as STATE from '../../../constants/state'
import { fetchMyCompaniesAction } from '../actions/myCompanies'

const mapStateToProps = (state) => ({
  loading: R.path([STATE.USER_COMPANIES, 'loading'], state),
  list: R.pathOr([], [STATE.USER_COMPANIES, 'data'], state)
})

const mapDispatchToProps = {
  fetchMyCompaniesAction
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream((props$) => {
    props$
      .first()
      .subscribe(props => props.fetchMyCompaniesAction())

    return props$
  })
)(Companies)