import {head, groupBy, prop, pluck, map, compose, ap} from 'ramda'
import Future from 'fluture'
import {findUsers} from 'userRepository'
import {fetchPermissionsForUsers} from 'permissionRepository'

const fetchPermissions = (users) =>
  compose(map(permissions => ({users, permissions})), fetchPermissionsForUsers, pluck('id'))(users)

const joinUsersAndPermissions = ({users, permissions}) => {
  const addPermissions = curry((permissions, user) => ({...user, permissions: permissions[user.id] }))
  const idMap = reduce((a, e) => ({...a, [e.id]: e}), {})
  return map(addPermission(idMap(permissions)), users)
}

export default compose(map(joinUsersAndPermissions), fetchPermissions, findUsers)
