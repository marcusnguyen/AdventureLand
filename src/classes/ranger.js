import default_range_attack from './default_range_attack'
import { find_viable_targets } from '../utils'
import { monster_to_farm } from '../common/variables'

export default {
  farm() {
    const target = find_viable_targets()[0]

    if (!target && !smart.moving) {
      smart_move(monster_to_farm[0])
    } else {
      default_range_attack(target)
    }
  },
}
