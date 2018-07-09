const https = require('https')
const fs = require('fs')
const env = require('dotenv').config()
const { ask } = require('./helpers')
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
      stdout.write('You are in' + this.location + '\r\n')
      return ask('What is the date (mm-dd-yyyy)? ex. 07-04-2018')
    })
    .then((answer)=>{
      this.date = answer
    })
    .catch(err => stdout.write(err))
}

Journal.prototype.getEntry = function() {
    return ask('Write away!')
    .then((answer) => {
        this.entry = answer
    })
}


Journal.prototype.init = function(){
  this.getMetaData()
  .then(() => {
    return this.getEntry();
  })
  .then(() => {
    const filename = this.date + '_' + this.location
    return fs.writeFileSync(
      process.env.FILEPATH + '/' + filename,
      this.entry,
      (err) => err && console.log(err)
    )
  })
  .catch((err)=>{
    stdout.write(err)
  })
}




const session = new Journal()
session.init()