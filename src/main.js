import {
  resupply_potions,
  num_items,
  get_npc,
  distance_to_point,
  start_party,
  find_viable_targets,
} from './utils'
import {
  min_potions,
  potion_types,
  monster_to_farm,
  players_to_invite,
  party_leader,
} from './common/variables'
import { isEmpty } from 'ramda'

export default function main() {
  game_log('---Script Start---')
  var state = 'farm'
  var current_party = get_party()

  if (isEmpty(current_party)) start_party()

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
    //Attack or move to target
    if (target != null) {
      if (distance_to_point(target.real_x, target.real_y) < character.range) {
        if (can_attack(target)) {
          attack(target)
        }
      } else {
        move_to_target(target)
      }
    } else {
      if (!smart.moving) {
        game_log('finding a target')
        smart_move({ to: monster_to_farm[0] })
      }
    }
  }

  //This function will ether move straight towards the target entity,
  //or utilize smart_move to find their way there.
  function move_to_target(target) {
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
}
