//This function will ether move straight towards the target entity,
//or utilize smart_move to find their way there.

export default move_to_target = (target) => {
  if (can_move_to(target.real_x, target.real_y)) {
    smart.moving = false
    smart.searching = false
    move(
      character.real_x + (target.real_x - character.real_x) / 2,
      character.real_y + (target.real_y - character.real_y) / 2
    )
  } else {
    if (!smart.moving) {
      smart_move({ x: target.real_x, y: target.real_y })
    }
  }
}
