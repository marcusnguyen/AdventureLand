//Returns the number of items in your inventory for a given item name;

export default num_items = (name) => {
  var item_count = character.items
    .filter((item) => item != null && item.name == name)
    .reduce(function (a, b) {
      return a + (b['q'] || 1)
    }, 0)

  return item_count
}
