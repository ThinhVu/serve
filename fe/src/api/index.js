import axios from 'axios';
const API_URL = '' // 'http://localhost:3001';

function getRespData({data, error}) {
  if (error) {
    throw error
  }
  if (typeof (data) === 'object' && data.data) {
    return data.data
  }
  return data
}

async function exec(asyncFn) {
  try {
    const rs = getRespData(await asyncFn())
    if (window.__debug)
      console.log(rs)
    return rs;
  } catch (e) {
    console.log(e)
  }
}

let axiosOpts = {};

export const feAPI = {
  folder: {
    ls: async (path) => exec(() => axios.get(`${API_URL}/fs?p=${path || ''}`, axiosOpts)),
    resolve: (path) => `${API_URL}/fs?p=${path || ''}`,
  }
}
