export default stay_in_safe_distance = (target) => {
  var safeRange = 200

  var distance = Math.hypot(
    character.real_x - target.real_x,
    character.real_y - target.real_y
  )

  // Comfortable range
  if (distance >= safeRange) {
    move(
      character.real_x + (target.real_x - character.real_x) / 2,
      character.real_y + (target.real_y - character.real_y) / 2
    )
  }
}
