export default get_npc = (name) => {
  var npc = parent.G.maps[character.map].npcs.filter((npc) => npc.id == name)

  if (npc.length > 0) {
    return npc[0]
  }

  return null
}
