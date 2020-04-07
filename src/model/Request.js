import axios from "ts-axios-anthony";
const BASEURL = "";

export default async (url = '', params = {}, type = 'GET') => {
  type = type.toUpperCase()
  if (type === 'GET') {
    let time = (new Date()).getTime()
    params.time = time
  }
  return new Promise((resolve, reject) => {
    axios({
      method: type,
      url: BASEURL + url,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      data: type === 'POST' ? params : '',
      params: type === 'GET' ? params : ''
    }).then(res => {
      // 成功响应
      resolve(res.data)
    }).catch(err => {
      // 失败响应
      reject(err)
    })
  })
}
