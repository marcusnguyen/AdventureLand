const fs = require('fs')
const data = fs.readFileSync('C:/marcusdev/AdventureLand/dist/main.js', 'utf8')
eval(data)