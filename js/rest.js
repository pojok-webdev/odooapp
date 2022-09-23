auth = obj => {
    var axios = require('axios');
    var data = JSON.stringify({
    "params": {
        "login": "apipadi@gmail.com",
        "password": "password.1",
        "db": "padish"
    }
    });

    var config = {
    method: 'post',
    url: 'https://demo.kapesolusi.work/auth',
    headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Basic Og==', 
        'Cookie': 'session_id=92988f65d1de15c859d3a5a9dccf36db64722a1c'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    return JSON.stringify(response.data)
    })
    .catch(function (error) {
    console.log(error);
    });

}
getClient = (obj,callback) => {
    var axios = require('axios');

    var config = {
    method: 'get',
    url: 'https://demo.kapesolusi.work/api/res.partner/?query={id,name,company_type}&filter=[["is_company","=",true]]',
    headers: { 
        'Cookie': 'session_id=11b6db3cbb80960aa2df94bf25c947d5e939b6e2'
    }
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        callback(JSON.stringify(response.data))
    })
    .catch(function (error) {
        console.log(error);
        callback(error)
    });

}
getSubscription = (obj,callback) => {
    var axios = require('axios');

    var config = {
      method: 'get',
      url: 'https://demo.kapesolusi.work/api/sale.subscription/?query={id,company_id{id,name},partner_id{id,name},name,display_name,recurring_invoice_line_ids{name,display_name}}',
      headers: { 
        'Cookie': 'session_id=802ee03041e0719988fa1ba07c23e8b0f6150ec3'
      }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      //callback(JSON.stringify(response.data))//
      callback(response.data)
    })
    .catch(function (error) {
        callback(error)
      console.log(error);
    });
    
}
getSubscriptionFilter = (obj,callback) => {
    var axios = require('axios');

    var config = {
      method: 'get',
      url: 'https://demo.kapesolusi.work/api/sale.subscription/?query={id,name,display_name,recurring_invoice_line_ids,partner_id{id,name}}&filter=[["partner_id","ilike","%'+obj.term+'%"]]',
      headers: { 
        'Cookie': 'session_id=802ee03041e0719988fa1ba07c23e8b0f6150ec3'
      }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error);
      callback(error)
    });
    }
getTickets = (obj,callback) => {
  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'http://localhost:2019/getticketsbysegment/'+obj.segment+'/'+obj.offset+'',
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    callback(response.data)
  })
  .catch(function (error) {
    console.log(error);
    callback(error)
  });
    //connect to ~/jsworkspace/tickets-server
}
getLines_ = (obj,callback) => {
  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'https://demo.kapesolusi.work/api/sale.subscription/?query={id,company_id{id,name},partner_id{id,name},name,display_name,recurring_invoice_line_ids{id,name,display_name}}&filter=[["partner_id","=",15]]',
    headers: { 
      'Cookie': 'session_id=802ee03041e0719988fa1ba07c23e8b0f6150ec3'
    }
  };
//demo.kapesolusi.work/api/sale.subscription/?query={id,company_id{id,name},partner_id{id,name},name,display_name,recurring_invoice_line_ids{id,name,display_name}}&filter=[["partner_id","=",11]]
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    callback(response.data)
  })
  .catch(function (error) {
    console.log(error);
    callback(error)
  });

}
getLines = (obj,callback) => {
  var axios = require('axios');
console.log('GetLine Obj',obj);
  var config = {
    method: 'get',
    url: 'https://demo.kapesolusi.work/api/sale.subscription.line?query={id,name,display_name}&filter=[["id","=","'+obj.term+'"]]',
    headers: { 
      'Cookie': 'session_id=802ee03041e0719988fa1ba07c23e8b0f6150ec3'
    }
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    callback(response.data)
  })
  .catch(function (error) {
    console.log(error);
    callback(error)
  });
  
}
getComplaints = callback => {
  var axios = require('axios');

  var config = {
    method: 'get',
    url: 'http://localhost:2019/getcomplaints',
    headers: { }
  };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    callback(response.data)
  })
  .catch(function (error) {
    console.log(error);
    callback(error)
  });

  }
  saveticket = (obj,callback) => {
    var axios = require('axios');
    var data = JSON.stringify({
      "tableName":"tickets",
      "columns":    obj.columns.map(col=>{
        return {"key":col.key,"val":col.val}
      })
  
    })
    var config = {
      method: 'post',
      url: 'http://localhost:2019/saveticket',
      headers: { 
        'Content-Type': 'application/json', 
        'Acc': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      callback(response.data)
    })
    .catch(function (error) {
      console.log(error);
      callback(error)
    });

}
module.exports = {
    auth:auth,
    getClient:getClient,
    getSubscription:getSubscription,
    getSubscriptionFilter:getSubscriptionFilter,
    getTickets:getTickets,
    getLines:getLines,
    getComplaints:getComplaints,
    saveticket:saveticket
}