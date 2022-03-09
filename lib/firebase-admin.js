import admin from 'firebase-admin'

const firebaseConfig = {
    "type": "service_account",
    "project_id": "hydromade-io",
    "private_key_id": "0617b667bed932028a2f283a3db2c659c6a35f85",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDz11ssIMXSokBC\nIrVDwCNb7s5sJC0aO59cRee4eCwAera8zDtzQjxpvh1O2wzjAaS1JwQUg0kjAfoH\nCTS9wxoR35WWwWIzLi+iiZO9BGdb1rrOBZ05e/NUAwfQCLV4CAbutnqjufEaIS9m\nMUJc4b+ySORR/GxUi62WJb4JW/0H19q/JbJYtIDM79HfaUcX6zNNbEypkhwuxMVx\neX8eDThEQjuYi4I3hziMLGsfHxoeUfr7zA9M8fO4QC/+c6vBvPJJBoHZ2dUfFsv8\nFZTdZ1i2DKY0aJ94NX3WuHMD2g6zG8SmyK0wY16fsjY4g6AH0W+nIqZ6hw2oV11S\nJyYKjzu1AgMBAAECggEACURBpilqWIEggog++Gpp8uwzeDd0Eay64hQ+WbZoFljo\n2WoZ3J043lw30RTw24P8OQMuJpkU/jQsxuLXbYUSLaQ1fd4ZsoVlO4l8GGvoAVI6\n1VSwHyy3TaseJfkywPNDJNlr9eK9h3yZMx/DnHPa0mEZRjFa15KwVTCtf725Hbiy\ntwo+dIOD/FYvPhQlVYLGMRPQq8YEVo3al4R5XtCxsHWDhDLdzW1daX6Dp9/dqwj8\nIcyowpBJxc96af0fAuFQg9rGaL7/JX+28vao6qNwo9bzvjnxg1WwLKwcr4ha/I+k\nbbuwkkYJ1BIBRlR9D5u+UXLa2O6tCLnlo0HspuB3MQKBgQD/HknDzWZvLOU/VIf6\nCVvbrzUlj4ByObEaIBUQ/O3KW3+6Wjebdi049KOM038bsRBxQUmfNsW/0eP21LeX\nLvZKc5G7NoUKfjjsUlc5FKJpmFBh3pIWYzIoCl267DW0QaXyMV1PeEKt1XajsdVW\nSWl1LJzynY+z3WSi2SZku5U0cQKBgQD0rxc9kc8ragsczGa4Gie6ps5YIXneuzJN\nShrSBqGeDJyUM/eDQuoqVOSvSB6SZipD5fVj/qnpP8SSb+RSUGS10Aeu3caAlnt6\nOmNg5soP2c8wOwr1QQ3EYJhsUsZQXIwEQTVfHFNJIGKugn2p7xz1vT0y2lWM0cyV\nKYQx6BVNhQKBgQCXK6lmHuYd5qqJFlvkq3sE+BM0CI6CIPFym6QgBuAY0pMjJ6Zf\ntm0hnMT1A7YEAK3PjnJDp78R5RuB/ZY0PZ2vjD/EgY/gId81Ga2Zo0KB88Fd3PcP\n0QO9ejcENke0Ylok4195YbeRLjY41X2mvaWBy0fM89RdLkkdvjLj6cuF4QKBgHtB\nO+7K5VYUO/bMzC2PF1ZBso3YhyB4odUnMC1+I6mO5s0NBHB9o6GhU/Ur2iKbDk1X\nqG4vmX2inq25aYVBdAnV+hjPJLAfnaGrieYFO+ISMPk1tMZod7vlgMKIS9etVubJ\nxk3b4eRjSPJpT03r4mWzZwGX1CJ0iJ7W4/2T0C9VAoGASA8bdrEMePWm1a6fTzoi\nYrkGv1zxOSWUXi38N0sHiVWyxwyp5lK5Tc8dKSNWV4pnOFpy3o8ZVld9MlHYywIv\nd6Nm3Sk04/cjgFZFcYG1xYwN1b8z5QLzJf8f5q5A8KQTBsuI0sKBMssrKsmeYKZQ\nPwdH/jJ80zew+0d9VKiLZ64=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-bh5yi@hydromade-io.iam.gserviceaccount.com",
    "client_id": "113544244645613190090",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-bh5yi%40hydromade-io.iam.gserviceaccount.com"
}

try {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    })

    admin.firestore().settings({
      timestampsInSnapshots: true
    })
  } catch (error) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
      console.error('Firebase admin initialization error', error.stack)
    }
  }
  
export const getAdminFirestoreCollection = async (collectionName) => {
    const results = await admin.firestore().collection(collectionName).get();

    let result = []
    results.forEach((doc) => {
        result.push({...doc.data(), id: doc.id})
    });
    return result;
}

export const runAdminQuery = async (snapshot) => {
  let result = []

  snapshot.forEach((doc) => {
      result.push({...doc.data(), id: doc.id})
  });

  return result;
}

export const runSingleQuery = async (collectionName, id) => await admin.firestore().collection(collectionName).doc(id).get();


export default admin