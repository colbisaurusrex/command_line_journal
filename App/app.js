const https = require('https')
const fs = require('fs')
const env = require('dotenv').config()
const { ask, today } = require('./helpers')
const { stdin, stdout } = process

const Journal = function(){
    this.location = null
    this.date = null
    this.day = null
    this.entry = null
}

Journal.prototype.getMetaData = function(){
  return ask('Where are you?')
    .then((answer)=>{
      this.location = answer
      return ask(`What is the date (${today()})?`)
    })
    .then(answer => this.date = (answer.length === 0 ? today() : answer))
    .catch(err => stdout.write(err))
}

Journal.prototype.getEntry = function() {
    return ask('Write away!')
    .then(answer => this.entry = answer)
}


Journal.prototype.init = function(){
  this.getMetaData()
  .then(() => this.getEntry())
  .then(() => {
    const filename = this.date + '_' + this.location
    return fs.writeFileSync(
      process.env.FILEPATH + '/' + filename,
      this.entry,
      (err) => err && console.log(err)
    )
  })
  .then(() => stdout.write('Another entry in the books! Goodbye!'))
  .then(() => process.exit())
  .catch((err)=>{
    stdout.write(err)
  })
}




const session = new Journal()
session.init()
