splito = (obj,callback) => {
    console.log("Splito paramgot",obj)
    callback(obj.split(","))
}
auth = (obj,callback) => {
    var axios = require('axios');
    var data = JSON.stringify({
      "params": {
        "login": "apipadi@gmail.com",
        "password": "Totol1nk",
        "db": "padish"
      }
    });
    
    var config = {
      method: 'post',
      url: 'https://demo.kapesolusi.work/auth',
      headers: { 
        'Content-Type': 'application/json', 
        'Cookie': 'session_id=endasmu'
        //'Cookie': 'session_id=29fd2eb8318cc0b3da98f293531069054e5eb488x'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      //console.log(JSON.stringify(response.data));
      //callback(JSON.stringify(response.data))
      console.log("response",response)
      /*splito(JSON.stringify(response.headers),hehe=>{
        callback(hehe)
      })*/
      callback(JSON.stringify(response.headers))
    })
    .catch(function (error) {
      console.log(error);
    });    
}
atuh = (callback) => {
    var axios = require('axios')
    var data = JSON.stringify({
        "params":{
            "login":"apipadi@gmail.com",
            "password":"Totol1nk",
            "db":"padish"
        }
    })
    var config = {
        method:'post',url:'https://demo.kapesolusi.work/auth',
        data:data
    }
    axios(config)
    .then(response=>{
        console.log("Response",response)
        callback(response)
         //callback(response.config.headers.Cookie)
    })
    .catch(error=>{
        console.log("Error",error)
        callback(error)
    })
}
kelurahanjakarta = (obj,callback) => {
    var axios = require('axios');
console.log('Params received',obj)
    var config = {
    method: 'get',
    url: 'https://demo.kapesolusi.work/api/vit.kelurahan?query={id,display_name,kecamatan_id{id,name,kota_id{id,name,state_id{id,name}}},name}&filter=[["kecamatan_id.kota_id.state_id.name","ilike","%jakarta%"]]',
    headers: { 
        'Cookie': 'session_id='+obj.session_id
    }
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    callback(JSON.stringify(response.data))
    })
    .catch(function (error) {
        callback(error)
    console.log(error);
    });

}
module.exports = {
    auth:auth,
    atuh:atuh,kelurahanjakarta:kelurahanjakarta
}