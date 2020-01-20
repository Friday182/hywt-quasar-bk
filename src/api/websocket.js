// const WSS_URL = `wss://wss.xxxx.com/ws?appid=xxx`
const WS_URL = `ws://127.0.0.1:8082/api/ws`
// const WS_URL = `ws://www.transfertestmaster.com/ws`
let Socket = ''
let setIntervalWesocketPush = null

export function createSocket () {
  console.log('start create websocket')

  if (!Socket) {
    Socket = new WebSocket(WS_URL)
    Socket.onopen = onopenWS
    Socket.onmessage = onmessageWS
    Socket.onerror = onerrorWS
    Socket.onclose = oncloseWS
  } else {
    console.log('websocket已连接')
  }
}
// send heartbeat
export function onopenWS () {
  sessionStorage.setItem('ws-status', 'OK')
  // When connected, client get default data at behind for all pages
  // this will reduce the loading time for all the pages
  sendWSPush({
    'mType': 'DEFAULT'
  })
  sendPing()
}
export function onerrorWS () {
  clearInterval(setIntervalWesocketPush)
  sessionStorage.setItem('ws-status', 'NOK')
  Socket.close()
  createSocket()
}
// send data out by window event
export function onmessageWS (e) {
  window.dispatchEvent(new CustomEvent('onmessageWS', {
    detail: {
      data: e
    }
  }))
}

export function sendWSPush (obj) {
  if (Socket !== null && Socket.readyState === 3) {
    Socket.close()
    createSocket()
  } else if (Socket.readyState === 1) {
    Socket.send(JSON.stringify(obj))
  } else if (Socket.readyState === 0) {
    setTimeout(() => {
      Socket.send(JSON.stringify(obj))
    }, 3000)
  }
}
export function oncloseWS () {
  clearInterval(setIntervalWesocketPush)
  sessionStorage.setItem('ws-status', 'NOK')
  console.log('websocket已断开')
}
export function sendPing () {
  Socket.send('ping')
  setIntervalWesocketPush = setInterval(() => {
    Socket.send('ping')
    console.log('sending ping ...')
  }, 5000)
}
