import db from "../db/index";

export default {
  get: (tokenData, callback) => {
    const queryString = `SELECT * from logs WHERE id = ${tokenData.id}`;
    db.query(queryString, (error, result) => {
      callback(error, result);
    });
  },

  post1: (userId, day, time, tokenData, callback) => {
    console.log("userId는", userId);
    const queryString = `UPDATE logs SET ${day} = ${day} + ${time} WHERE id = ${userId}`;
    db.query(queryString, (error, result) => {
      const queryString2 = `SELECT * FROM logs WHERE id = ${userId} ORDER BY createdAt DESC`;
      db.query(queryString2, (error, result) => {
        console.log("---------------------------------------", result);
        const totalTime =
          result[0].mon +
          result[0].tue +
          result[0].wed +
          result[0].thu +
          result[0].fri +
          result[0].sat +
          result[0].sun;
        console.log("타입", result[0]);
        const queryString3 = `UPDATE logs SET totalTime = totalTime + ${totalTime} WHERE id = ${userId}`;
        db.query(queryString3, (error, result) => {
          callback(error, result);
        });
      });
    });
  },

  post2: (userId, today, NextDay, todayTime, NextDayTime, tokenData, callback) => {
    const queryString = `UPDATE logs SET ${today} = ${today} + ${todayTime}, ${NextDay} = ${NextDay} + ${NextDayTime} WHERE id = ${userId}`;
    db.query(queryString, (error, result) => {
      const queryString2 = `SELECT * FROM logs WHERE id = ${userId}`;
      db.query(queryString2, (error, result) => {
        const totalTime =
          result[0].mon +
          result[0].tue +
          result[0].wed +
          result[0].thu +
          result[0].fri +
          result[0].sat +
          result[0].sun;
        const queryString3 = `UPDATE logs SET totalTime = totalTime + ${totalTime} WHERE id = ${userId}`;
        db.query(queryString3, (error, result) => {
          callback(error, result);
        });
      });
    });
  },
};
