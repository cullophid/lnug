import {map, compose, ap} from 'ramda'
import Future from 'fluture'
import {fetchUser} from 'userRepository'
import {fetchPermissionsForUser} from 'permissionRepository'

const fetchUser = userRepository.fetch
const fetchUserAndPermissions = userid =>
  Future.parallel(infinity, [fetchPermissionsForUser(userid), fetchUser(userid)])

export default compose(map(assoc('permissions')), fetchUserAndPermissions))
