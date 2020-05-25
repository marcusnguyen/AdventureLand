import { merchant as merchantName, min_gold } from '../common/variables'
import num_items from './num_items'

export default send_gold_to_merchant = () => {
  if (character.ctype === 'merchant') return

  const merchant = get_player(merchantName)
  if (
    !merchant ||
    merchant.ctype !== 'merchant' ||
    merchant.owner !== character.owner ||
    distance(merchant, character) > 600
  )
    return

  const total_items = character.items.filter((item) => item).length

  game_log(`Has ${total_items} items...`)

  if (total_items > 0) {
    for (let i = 0; i <= character.items.length; i++) {
      if (character.items[i]) {
        game_log(`Sending ${character.items[i]} to ${merchant}...`)
        send_item(merchant, i, 9999)
      }
    }
  }
}
