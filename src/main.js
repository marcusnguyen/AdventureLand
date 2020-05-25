import {
  resupply_potions,
  num_items,
  start_party,
  find_viable_targets,
  send_gold_to_merchant,
  stay_in_safe_distance,
  send_items_to_merchant,
} from './utils'
import {
  min_potions,
  potion_types,
  monster_to_farm,
  players_to_invite,
  party_leader,
  party_list,
} from './common/variables'
import { ranger, mage, warrior, merchant } from './classes'
import { isEmpty, isNil } from 'ramda'

const classes = {
  ranger,
  mage,
  warrior,
}

export default function main() {
  game_log('---Script Start---')

  if (character.name === party_leader) {
    add_bottom_button(1, 'Spawn', () => {
      const party = players_to_invite
      party.forEach((char) => {
        stop_character(char)
        start_character(char, 2)
      })
    })

    add_bottom_button(2, 'Despawn', () => {
      const party = players_to_invite
      party.forEach((char) => {
        stop_character(char)
      })
    })
  }

  if (character.ctype === 'merchant') {
    add_bottom_button(1, 'Supply', () => {
      merchant.supply_run()
    })
  }

  // Partying
  setInterval(function () {
    if (character.ctype === 'merchant') return
    var current_party = get_party()

    if (isEmpty(current_party)) start_party()
  }, 10000)

  // Default behavior
  setInterval(function () {
    farmer_controller()
  }, 100)

  //Potions And Looting
  setInterval(function () {
    loot()

    //Heal With Potions if we're below 75% hp.
    if (
      character.hp / character.max_hp < 0.75 ||
      character.mp / character.max_mp < 0.75
    ) {
      use_hp_or_mp()
    }
  }, 500) //Execute 2 times per second

  setInterval(function () {
    send_gold_to_merchant()
    send_items_to_merchant()
  }, 15000)

  window.on_party_invite = on_party_invite
  window.on_party_request = on_party_request

  function on_party_invite(name) {
    if (name === party_leader) accept_party_invite(name)
  }

  function on_party_request(name) {
    if (players_to_invite.includes(name)) accept_party_request(name)
  }

  //This function contains our logic for when we're farming mobs
  function farmer_controller() {
    if (character.ctype === 'merchant') {
      return
    }

    classes[character.ctype].farm()

    if (character.name !== party_leader && !smart.moving) {
      const leader = get_player(party_leader)
      if (!leader) return
      stay_in_safe_distance(leader)
    }
  }
}
