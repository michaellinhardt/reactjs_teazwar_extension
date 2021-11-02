export default { auth }

function auth (store) {
  return {
    path: '/user/auth',
    data: { socket_id: store.ui.socket_id }
  }
}