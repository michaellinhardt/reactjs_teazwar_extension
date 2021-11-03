export default { exit }

function exit (store) {
  const { cutscene } = store.ressources
  const { cutscene_id } = cutscene
  return {
    path: '/cutscene/exit',
    data: { cutscene_id },
  }
}