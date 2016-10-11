import express from 'express'
import getUser from './get_user'
const {PORT = 3000} = process.env
app = express()
app.get('user/:userid', (req, res) => {
  getUser(req.param.userid)
    .fork(
      e => res.status(e.status || 500).send(e.message || 'internal server error'),
      r => res.send(r)
    )
})
app.listen(PORT, () => console.log(`process started on port ${PORT}`)
