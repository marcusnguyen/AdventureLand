export default default_range_attack = (target) => {
  const dist = parent.distance(character, target)
  if (dist < character.range / 3) {
    const move_to = {
      x: character.x - (target.x - character.x) / 4,
      y: character.y - (target.y - character.y) / 4,
    }
    if (can_move_to(move_to.x, move_to.y)) {
      move(
        character.x - (target.x - character.x) / 4,
        character.y - (target.y - character.y) / 4
      )
      set_message('Evading')
      return
    } else {
      move(
        character.x + (target.x - character.x) * 2,
        character.y + (target.y - character.y) * 2
      )
      set_message('Running')
    }
  }
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
