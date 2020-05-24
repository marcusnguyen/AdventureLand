import { merchant as merchantName, min_gold } from '../common/variables'

export default send_gold_to_merchant = () => {
  if (character.ctype === 'merchant') return

  const merchant = get_player(merchantName)
  if (
    !merchant ||
    merchant.ctype !== 'merchant' ||
    merchant.owner !== character.owner ||
    distance(merchant, character) > 400 ||
    character.gold < min_gold
  )
    return
  game_log(`Sending ${character.gold} to ${merchantName}`)
  send_gold(merchant, character.gold - min_gold)
}
