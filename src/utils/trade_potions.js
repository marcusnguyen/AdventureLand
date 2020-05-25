import { party_list } from '../common/variables'
import num_items from './num_items'
import { potion_types, min_potions } from '../common/variables'

export default trade_potions = () => {
  potion_types.forEach((potion) => {
    const potion_position = locate_item(potion)
    if (potion_position === -1) return

    const amount = num_items(potion)
    let amount_to_trade = 0

    if (amount >= min_potions * 3 + 1) {
      // make sure each member get at least min_potions and merchant has 1 potions left
      amount_to_trade = min_potions
    } else {
      amount_to_trade = Math.floor((amount - 1) / party_list.length) // keep at least 1 potion to maintain potions' position
    }

    party_list.forEach((partyMember) => {
      send_item(partyMember, potion_position, amount_to_trade)
    })
  })
}
