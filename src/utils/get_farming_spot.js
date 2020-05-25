export default get_farming_spot = (monster_name, farm_map, action) => {
  for (map in G.maps) {
    for (monster in G.maps[map].monsters) {
      const current_monster = G.maps[map].monsters[monster]
      if (map === farm_map && current_monster.type === monster_name) {
        const destination = {
          x:
            current_monster.boundary[0] +
            (current_monster.boundary[2] - current_monster.boundary[0]) / 2,
          y:
            current_monster.boundary[1] +
            (current_monster.boundary[3] - current_monster.boundary[1]) / 2,
        }

        if (action === 'move') {
          if (character.map !== map) {
            smart_move({ to: map })
          } else {
            smart_move({ x: destination.x, y: destination.y })
          }
        } else if (action === 'coord') {
          return destination
        }
      }
    }
  }
}
