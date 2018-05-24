import { find, equals } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { compose, setDisplayName } from 'recompose'
import Checkbox from '@material-ui/core/Checkbox'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter } from 'react-router-dom'
import { getSelectIdsFromRoute } from './helper'

const styles = theme => ({
  root: {
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
    '0px 4px 5px 0px rgba(0, 0, 0, 0.14), ' +
    '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
    borderBottom: '2px solid #eee',
    transition: '0.4s',
    width: '100%',
  },
  beforeActive: {
    borderBottom: 'none'
  },
  afterActive: {
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
    '0px -1px 5px 0px rgba(0, 0, 0, 0.14), ' +
    '0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
  },
  checkbox: {
    marginRight: '5px',
    maxWidth: '100px !important'
  },
  column: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme.table.backgroundColor
  },
  checkboxHead: {
    color: '#fff !important'
  },
  noBackground: {
    boxShadow: 'unset',
    borderBottom: 'unset',
    '& > div': {
      backgroundColor: 'transparent'
    }
  },
  detail: {
    margin: '50px -20px',
    border: 'none',
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), ' +
    '0px -1px 5px 0px rgba(0, 0, 0, 0.14), ' +
    '0px 1px 2px 0px rgba(0, 0, 0, 0.12)'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  }
})

const enhance = compose(
  withRouter,
  withStyles(styles),
  setDisplayName('TableRow')
)

const TableRow = ({ classes, ...props }) => {
  const selectIds = getSelectIdsFromRoute(props.history)
  const checked = Boolean(find(equals(parseInt(props.id)), selectIds))

  //  const detailNode = prop('detail', detail)
  //  const detailId = prop('id', detail)
  // console.warn(children)
  //   const rows = mapWithIndex((item, index) => {
  //     const id = getById(item)
  //     const active = equals(id, detailId)
  //     const beforeActive = equals(getById(path([index + 1], list)), detailId)
  //     const afterActive = equals(getById(path([index - 1], list)), detailId)
  //     const column = renderColumn(item, index, children)
  //     const className = classNames(classes.root, {
  //       [classes.detail]: active,
  //       [classes.beforeActive]: beforeActive,
  //       [classes.afterActive]: afterActive,
  //     })
  //     const checked = pipe(
  //       filter((item) => item === id),
  //       isEmpty,
  //       not
  //     )(selectIds)
  //
  //     return (
  //       <div key={index} className={className}>
  //         <div className={classes.column}>
  //           {checkboxEnable && (
  //             <div className={classes.checkbox}>
  // {/*              <Checkbox onChange={(event, value) => onCheckItem(value, id)} checked={checked} />*/}
  //             </div>
  //           )}
  //           {column}
  //         </div>
  //         {active && detailNode}
  //       </div>
  //     )
  //   }, list)

  return (
    <div className={classNames(classes.root, { [classes.noBackground]: props.noBg })}>
      <div className={classes.column}>
        {props.withCheckbox && (
          <div className={classes.checkbox}>
            {props.isBody ? (
              <Checkbox
                onChange={(event, value) => props.onCheckItem({ value, id: props.id })}
                checked={checked}
              />
            ) : (
              <Checkbox
                classes={{
                  root: classes.checkboxHead
                }}
                onChange={(event, value) => props.onCheckAll(value)}
                checked={props.fullyChecked}
                indeterminate={props.partiallyChecked}
              />
            )}
          </div>
        )}
        <div className={classes.row}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

TableRow.defaultProps = {
  noBg: false
}

TableRow.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  detail: PropTypes.object,
  noBg: PropTypes.bool,
  history: PropTypes.object,
  id: PropTypes.string,
  isBody: PropTypes.bool,
  withCheckbox: PropTypes.bool.isRequired,
  partiallyChecked: PropTypes.bool,
  fullyChecked: PropTypes.bool,
  onCheckItem: PropTypes.func,
  onCheckAll: PropTypes.func,
}

export default enhance(TableRow)
