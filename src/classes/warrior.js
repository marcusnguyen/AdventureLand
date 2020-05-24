import default_melee_attack from './default_melee_attack'

const useTaunt = (target) => {
  const skill = G.skills['taunt']
  if (!is_on_cooldown('taunt') && character.mp > skill.mp) use_skill('taunt', target)
}

export default {
  attack(target) {
    if (get_target_of(target) !== character.name) useTaunt(target)
    default_melee_attack(target)
  },
}
