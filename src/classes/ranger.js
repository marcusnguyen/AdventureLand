import default_range_attack from './default_range_attack'
import { find_viable_targets, get_farming_spot } from '../utils'
import { monster_to_farm, farming_map } from '../common/variables'

export default {
  farm() {
    const target = find_viable_targets()[0]

    if (!target && !smart.moving) {
      get_farming_spot(monster_to_farm[0], farming_map, 'move')
    } else {
      default_range_attack(target)
    }
  },
}
