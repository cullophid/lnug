import nodeMysql = 'mysql'

const mysql = curry((url, queryString, params) => {
  return new Task((resolve, reject) => {
    const conn = nodeMysql.createConnection(url)
    conn.connect()
    conn.query(queryString, prams, (err, res) => err ? reject(err) : resolve)
  })
}

const query = mysql('mysql:stefano:tits@localhost:25937')

const insertUser = query('INSERT INTO auth (email, password) VALUES (?, ?)')



export default  = (req, res) => {
  const {email, password} = req.body
  return insertUser([email, hash(password)])
}
