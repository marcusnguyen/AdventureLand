import empty_slots from './empty_slots'
import { min_potions, potion_types } from '../common/variables'

const purchase_amount = 200

export default buy_potions = () => {
  if (empty_slots() > 0) {
    for (type_id in potion_types) {
      var type = potion_types[type_id]

      var item_def = parent.G.items[type]

      if (item_def != null) {
        var cost = item_def.g * purchase_amount

        if (character.gold >= cost) {
          var num_potions = num_items(type)

          if (num_potions < min_potions) {
            buy(type, purchase_amount)
          }
        } else {
          game_log('Not Enough Gold!')
        }
      }
    }
  } else {
    game_log('Inventory Full!')
  }
}
