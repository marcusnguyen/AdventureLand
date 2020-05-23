export default default_melee_attack = (target) => {
  if (!in_attack_range(target)) {
    move(
      character.x + (target.x - character.x) / 2,
      character.y + (target.y - character.y) / 2
    )
    // Walk half the distance
  } else if (can_attack(target)) {
    set_message('Attacking')
    attack(target)
  }
}
