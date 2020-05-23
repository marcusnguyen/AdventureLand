import buy_potions from './buy_potions'
import distance_to_point from './distance_to_point'

export default resupply_potions = () => {
  var potion_merchant = get_npc('fancypots')

  var distance_to_merchant = null

  if (potion_merchant != null) {
    distance_to_merchant = distance_to_point(
      potion_merchant.position[0],
      potion_merchant.position[1]
    )
  }

  if (!smart.moving && (distance_to_merchant == null || distance_to_merchant > 250)) {
    smart_move({ to: 'potions' })
  }

  if (distance_to_merchant != null && distance_to_merchant < 250) {
    buy_potions()
  }
}
