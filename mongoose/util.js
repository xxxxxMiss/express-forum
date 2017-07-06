const objectIdToTimestamp = require('objectid-to-timestamp')
const moment = require('moment')

class UtilClass{
  // instance method(methods)
  addCreateAt(){
    // caution: the object returned by mongoose is document object,
    // you cannot change it, if you want to do so, 
    // you must call toObject method to convert the document object to plain js object
    let jsObj = this.toObject()
    jsObj.createAt = moment(objectIdToTimestamp(jsObj._id)).format('YYYY-MM-DD HH:mm')
    return jsObj
  }

  // virtual can not be same as schema property, 
  // othewise cause conflict
  get formatDate(){
    return moment(this.create_at).format('YYYY-MM-DD HH:mm')
  }
  
  // update collect_count, ask_count and so on
  static updateUser(userId, field, value){
    return this.findOneAndUpdate({ _id: userId }, { $inc: { [field]: value } }, { new: true })
  }

  // static method(statics)
  // set method(virtual)
  // get method(virtual)
}

module.exports = UtilClass