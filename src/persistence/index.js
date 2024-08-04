import * as ExpoSQLite from "expo-sqlite"

const db = ExpoSQLite.openDatabase("sessions.db")

export const initSQLiteDB = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);",
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      )
    })
  })

  return promise
}

export const insertSession = ({ email, token, localId }) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO sessions (email, token, localId) VALUES (?,?,?);",
        [email, token, localId],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      )
    })
  })

  return promise
}

export const getSession = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM sessions;",
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      )
    })
  })

  return promise
}

export const truncateSessionTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE from sessions;",
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      )
    })
  })

  return promise
}