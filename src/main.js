import {
  resupply_potions,
  num_items,
  start_party,
  find_viable_targets,
  send_gold_to_merchant,
} from './utils'
import {
  min_potions,
  potion_types,
  monster_to_farm,
  players_to_invite,
  party_leader,
} from './common/variables'
import { ranger, mage, warrior } from './classes'
import { isEmpty } from 'ramda'

const classes = {
  ranger,
  mage,
  warrior,
}

export default function main() {
  game_log('---Script Start---')
  var state = 'farm'

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

  setInterval(function () {
    var current_party = get_party()

    if (isEmpty(current_party)) start_party()
  }, 10000)

  //Movement And Attacking
  setInterval(function () {
    //Determine what state we should be in.
    state_controller()

    //Switch statement decides what we should do based on the value of 'state'
    switch (state) {
      case 'farm':
        farm()
        break
      case 'resupply_potions':
        resupply_potions()
        break
    }
  }, 100) //Execute 10 times per second

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
    if (character.name === 'MyraWarrior' || state === 'resupply_potions') return
    var tank = get_player('MyraWarrior')
    var safeRange = 200

    var distance = Math.hypot(
      character.real_x - tank.real_x,
      character.real_y - tank.real_y
    )

    // Comfortable range
    if (distance >= safeRange) {
      move(
        character.real_x + (tank.real_x - character.real_x) / 2,
        character.real_y + (tank.real_y - character.real_y) / 2
      )
    }
  }, 5000)

  setInterval(function () {
    send_gold_to_merchant()
  }, 5000)

  window.on_party_invite = on_party_invite
  window.on_party_request = on_party_request

  function on_party_invite(name) {
    if (name === party_leader) accept_party_invite(name)
  }

  function on_party_request(name) {
    if (players_to_invite.includes(name)) accept_party_request(name)
  }

  function state_controller() {
    //Default to farming
    var new_state = 'farm'

    //Do we need potions?
    for (type_id in potion_types) {
      var type = potion_types[type_id]

      var num_potions = num_items(type)

      if (num_potions < min_potions) {
        game_log(
          `Low on potions: ${type} has ${num_potions} left. Need at least ${min_potions}`
        )
        new_state = 'resupply_potions'
        break
      }
    }

    if (state != new_state) {
      state = new_state
    }
  }

  //This function contains our logic for when we're farming mobs
  function farm() {
    var target = find_viable_targets()[0]

    if (!target) {
      target = get_nearest_monster({ min_xp: 100, max_att: 120 })
      if (target) change_target(target)
      else {
        set_message('No Monsters')
        return
      }
    }

    classes[character.ctype].attack(target)
  }
}
