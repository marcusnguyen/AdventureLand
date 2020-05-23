import { players_to_invite, party_leader } from '../common/variables'

export default start_party = () => {
  if (character.name === party_leader) {
    players_to_invite.forEach((name) => {
      send_party_invite(name, false)
    })
  } else {
    send_party_request(party_leader)
  }
}
