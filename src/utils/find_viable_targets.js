import { monster_to_farm } from '../common/variables'

//Returns an ordered array of all relevant targets as determined by the following:
////1. The monsters' type is contained in the 'monsterTargets' array.
////2. The monster is attacking you or a party member.
////3. The monster is not targeting someone outside your party.
//The order of the list is as follows:
////Monsters attacking you or party members are ordered first.
////Monsters are then ordered by distance.

export default find_viable_targets = () => {
  var monsters = Object.values(parent.entities).filter(
    (mob) =>
      ((mob.target == null ||
        parent.party_list.includes(mob.target) ||
        mob.target == character.name) &&
        mob.type == 'monster' &&
        (parent.party_list.includes(mob.target) || mob.target == character.name)) ||
      monster_to_farm.includes(mob.mtype)
  )

  for (id in monsters) {
    var monster = monsters[id]

    if (
      parent.party_list.includes(monster.target) ||
      monster.target == character.name
    ) {
      monster.targeting_party = 1
    } else {
      monster.targeting_party = 0
    }
  }

  //Order monsters by whether they're attacking us, then by distance.
  monsters.sort(function (current, next) {
    if (current.targeting_party > next.targeting_party) {
      return -1
    }
    var dist_current = distance(character, current)
    var dist_next = distance(character, next)
    // Else go to the 2nd item
    if (dist_current < dist_next) {
      return -1
    } else if (dist_current > dist_next) {
      return 1
    } else {
      return 0
    }
  })
  return monsters
}
