import TypeActions from './constants'

let initialState = {
  devices: [],
  arrayDevices: [],
  filterDevices: [],
  devicesOnline: [],
  devicesOffline: [],
  checkedOnline: false,
  checkedOffline: false,
  connection: false,
  lwt: [],
  mqtt: {
    host: '',
    port: '',
    clientId: '',
    username: '',
    password: '',
    topic: ''
  }
}

export default function (state = initialState, action) {

  switch (action.type) {

    case TypeActions.MQTT_CONNECT :
      state.mqtt = {
        host: action.data.host,
        port: action.data.port,
        clientId: action.data.clientId,
        username: action.data.username,
        password: action.data.password,
        topic: action.data.topic
      }
      break

    case TypeActions.MQTT_DISCONNECT:

      break

    case TypeActions.MQTT_CONNECTION_SUCCESS:
      state.connection = true
      break

    case TypeActions.MQTT_MESSAGE_ARRIVED:
      let d = action.data.d
      let info = action.data.info
      let devices = state.devices
      let actionData = action.data
      if (state.lwt[`id-${info.id}`].status === 0) {
        actionData.classCardHeader = 'card-header bg-secondary'
      } else {
        actionData.classCardHeader = 'card-header bg-success'
      }
      devices[d.myName] = actionData
      Object.keys(devices).forEach((key, idx) => {
        state.arrayDevices[idx] = devices[key]
      })
      break

    case TypeActions.MQTT_FILTER_DEVICES_NAME:

      break

    case TypeActions.CHECKED_ONLINE:

      break

    case TypeActions.CHECKED_OFFLINE:

      break

    case TypeActions.DEVICES_ONLINE:
      if (state.devicesOnline[action.data.d.myName] === undefined) {
        state.devicesOnline[action.data.d.myName] = action.data
      }
      return {...state, devicesOnline: [action.data.d.myName] = action.data}

    case TypeActions.DEVICES_OFFLINE:
      if (state.devicesOffline[action.data.d.myName] === undefined) {
        state.devicesOffline[action.data.d.myName] = action.data
      }
      return {...state, devicesOffline: [action.data.d.myName] = action.data}

    case TypeActions.LWT:
      state.lwt[`id-${action.data.id}`] = action.data
      break

    default:
      //console.log('default state')
      return state

  }

}