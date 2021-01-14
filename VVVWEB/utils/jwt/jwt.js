const jwt = require('jsonwebtoken');
const Token = {
   //  生成
  encrypt:function(data,time){ //data加密数据，time过期时间
    return jwt.sign(data, 'wtechtec', {expiresIn: 60 *  30 })
  },
  // 解析
  decrypt:function(token){
    try {
      let data = jwt.verify(token, 'wtechtec');
      return {
        token:true
      };
    } catch (e) {
      return {
        token:false,
        data:e
      }
    }
  }
}
module.exports = Token;