const objectIdToTimestamp = require('objectid-to-timestamp')
const moment = require('moment')

class UtilClass{
  // instance method(methods)
  // addCreateAt(){
  //   // caution: the object returned by mongoose is document object,
  //   // you cannot change it, if you want to do so, 
  //   // you must call toObject method to convert the document object to plain js object
  //   let jsObj = this.toObject()
  //   jsObj.createAt = moment(objectIdToTimestamp(jsObj._id)).format('YYYY-MM-DD HH:mm')
  //   return jsObj
  // }

  get createAgo(){
    let timestamp = moment(this.create_at).unix()
      , now = moment().unix()
      , delta = now - timestamp
    
    if(delta < 60){  // min
      return '刚刚'
    }else if(delta < 60 * 60){ // hour
      return `${parseInt(delta / 60)}分钟前`
    }else if(delta < 24 * 60 * 60){
      return `${parseInt(delta / 60 / 60)}小时前`
    }else if(delta < 7 * 24 * 60 * 60){
      return `${parseInt(delta / 24 / 60 / 60)}天前`
    }else if(delta < 30 * 24 * 60 * 60){
      return `${parseInt(delta / 7 / 24 / 60 / 60)}周前`
    }else if(delta < 365 * 24 * 60 * 60){
      return `${parseInt(delta / 30 / 24 / 60 / 60)}月前`
    }else{
      return `${parseInt(delta / 365 / 24 / 60 / 60)}年前`
    }
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