const objectIdToTimestamp = require('objectid-to-timestamp')
const moment = require('moment')

class UtilClass{
  // instance method(methods)
  addCreateAt(){
    // be caution: the object returned by mongoose is document object,
    // you cannot change it, if you want to do so, 
    // you must call toObject method to convert the document object to plain js object
    let jsObj = this.toObject()
    jsObj.createAt = moment(objectIdToTimestamp(jsObj._id)).format('YYYY-MM-DD HH:mm')
    return jsObj
  }
  
  // static method(statics)
  // set method(virtual)
  // get method(virtual)
}

module.exports = UtilClass