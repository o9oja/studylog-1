import db from "../db";

export default {
  post: (email: string, callback: Function) => {
    const queryString = `SELECT * FROM users WHERE email = "${email}"`
    db.query(queryString, (error, result) => {
      if (error) {
        return callback(error, null)
      } else {
        callback(null, result)
      }
    })
  }
}