const min_potions = 200 //The number of potions at which to do a resupply run.
const no_potions_to_buy = 600
const potion_types = ['hpot0', 'mpot0'] //The types of potions to keep supplied.
const monster_to_farm = ['snake']
const farming_map = 'main'
const players_to_invite = ['MyraWarrior', 'MyraRanger']
const party_leader = 'MyraklusMage'
const party_list = [...players_to_invite, party_leader]
const merchant = 'MyraMerchant'
const min_gold = 1000

export {
  min_potions,
  potion_types,
  monster_to_farm,
  players_to_invite,
  party_leader,
  min_gold,
  merchant,
  no_potions_to_buy,
  farming_map,
  party_list,
}
