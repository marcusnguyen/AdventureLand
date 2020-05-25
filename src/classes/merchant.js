import {
  get_farming_spot,
  resupply_potions,
  trade_potions,
  num_items,
  distance_to_point,
} from '../utils/'
import {
  monster_to_farm,
  farming_map,
  potion_types,
  min_potions,
  party_list,
} from '../common/variables'

export default {
  supply_run() {
    for (type_id in potion_types) {
      var type = potion_types[type_id]

      var num_potions = num_items(type)

      if (num_potions < min_potions) {
        game_log(
          `Low on potions: ${type} has ${num_potions} left. Need at least ${min_potions}`
        )
        resupply_potions()
      }
    }

    const farming_spot = get_farming_spot(monster_to_farm[0], farming_map, 'coord')
    const distance_to_farming_spot = distance_to_point(farming_spot.x, farming_spot.y)

    if (!smart.moving && distance_to_farming_spot > 300) {
      if (character.map !== farming_map) {
        smart_move({ to: farming_map })
      } else {
        smart_move({ x: farming_spot.x, y: farming_spot.y })
      }
    }

    if (distance_to_farming_spot <= 300) {
      trade_potions()
      smart_move({ to: farming_map })
    }
  },
}
