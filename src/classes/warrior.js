import default_melee_attack from './default_melee_attack'
import { find_viable_targets, get_farming_spot } from '../utils'
import { monster_to_farm, farming_map } from '../common/variables'

const useTaunt = (target) => {
  const skill = G.skills['taunt']
  if (!is_on_cooldown('taunt') && character.mp > skill.mp) use_skill('taunt', target)
}

export default {
  farm() {
    const target = find_viable_targets()[0]

    if (!target && !smart.moving) {
      get_farming_spot(monster_to_farm[0], farming_map, 'move')
    } else {
      if (get_target_of(target) !== character.name) useTaunt(target)
      default_melee_attack(target)
    }
  },
}
