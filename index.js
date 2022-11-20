var i = require('./js/initapp')
i.app.post('/auth',(req,res)=>{
    params = req.body
    //req.session = res
    i.rest.authenticate({
        "user":"apipadi@gmail.com","password":"Totol1nk"
    },auth=>{
        res.send(auth)
    })
})
i.app.get('/getclients',(req,res)=>{
    console.log('Session',req.session)
    i.rest.getClient({session_id:req.session.session_id},obj=>{
        res.send(obj)
    })
})
i.app.get('/getsubscription',(req,res)=>{
    i.rest.getSubscription({},obj=>{
        console.log("OBJ retrieved",obj)
        res.send({data:obj.result.map(item=>{
            return [
                item.name,
                item.display_name,
                item.partner_id.name,
                item.recurring_invoice_line_ids.length,
                item.recurring_invoice_line_ids
            ]
        })})
    })
})
i.app.get('/getsubscriptionselect2/:term',(req,res)=>{
    i.rest.getSubscriptionFilter(req.params,obj=>{
        console.log('OBJ',obj)
        res.send({results:obj.result.map(item=>{
            return {id:item.recurring_invoice_line_ids,text:item.display_name}
        })})
    })
})
i.app.get('/getlines/:term',(req,res)=>{
    i.rest.getLines(req.params,obj=>{
        console.log('Lines',obj)
        res.send({results:obj.result.map(item=>{
            console.log('ITEm',item)
            return {id:item.id,text:item.display_name}
        })})
    })
})
i.app.get('/getcomplaints',(req,res)=>{
    i.rest.getComplaints(obj=>{
        console.log("complaintes",obj)
        res.send({results:obj.map(item=>{
            return {id:item.id,text:item.name}
        })})
    })
})
i.app.get('/gettickets/:segment/:offset',(req,res)=>{
    params = req.params
    params.session_id = req.session.session_id
    console.log('Params',params)
    i.rest.getTickets(params,obj=>{
        console.log("Ticket Obj",obj)
        res.send({data:obj.map(item=>{
            console.log("Item",item)
            return [
                item.kdticket,
                item.clientname,
                item.complaint,
                item.create_date,
                item.create_date
            ]
        })})
    })
})
i.app.get('/showclients',(req,res)=>{
    i.rest.getSubscription({session_id:req.cookies.session_id},obj=>{
        console.log('clients',obj)
        res.send(obj)
/*        res.render('data',{
            title:'Subscription',
            url:'getsubscription'
        })*/
    })
})
i.app.get('/showtickets',(req,res)=>{
    res.render('tickets/index',{
        title:'Tickets',
        url:'gettickets/1/10'
    })
})
i.app.post('/saveticket',(req,res)=>{
    params = req.body
    i.rest.saveticket(params,result=>{
        res.send(result)
    })
})
i.functables.functs.forEach(element => {
    i.app.get('/'+element,(req,res)=>{
        i.rest[element]
        res.send({"response":element})
    })
});
i.app.get('/login',(req,res)=>{
    i.auth.auth({
        login:'apipadi@gmail.com',
        password:'Totol1nk'
    },auth=>{
        //console.log("Auth",auth[8])
        let myfind = auth.search('session_id')
        console.log('MyFind',myfind)
        let mystr = auth.substring(myfind,auth.length)
        console.log('my substring',mystr)
        myfind2 = mystr.search(';')
        mysubstr = mystr.substring(11,myfind2)
        console.log('FInal subString',mysubstr)
        req.session.session_id = mysubstr//auth
        res.cookie('session_id',mysubstr)
//        res.send(mysubstr)
        res.render('logged',{
            session_id:mysubstr
        })
    })
})
i.app.get('/getsession',(req,res)=>{
    console.log('req',req.session)
    console.log('req cookie',req.cookies)
    res.send({'req':req.cookies})
})
i.app.get('/atuh',(req,res)=>{
    i.auth.atuh(x=>{
        res.send(x)
    })
})
i.app.get('/kelurahanjakarta',(req,res)=>{
    i.auth.kelurahanjakarta({session_id:req.cookies.session_id},resp=>{
        console.log(resp)
        res.send(resp)
    })
})
i.app.get('/showkelurahanjakarta',(req,res)=>{
    res.render('kelurahanjakarta',{
        title:'kelurahan jakarta',
        url:'postman/kelurahansajajakarta.json'
    })
})
i.app.get('/showkelurahanjawatimur',(req,res)=>{
    res.render('kelurahanjawatimur',{
        title:'kelurahan jawa timur',
        url:'postman/kelurahansajajawatimur.json'
    })
})
i.app.get('/showkelurahanjawabarat',(req,res)=>{
    res.render('kelurahanjawabarat',{
        title:'kelurahan jawa barat',
        url:'postman/kelurahansajajawabarat.json'
    })
})
i.app.get('/showkelurahanbali',(req,res)=>{
    res.render('kelurahanbali',{
        title:'kelurahan bali',
        url:'postman/kelurahansajabali.json'
    })
})
i.app.get('/showkecamatan',(req,res)=>{
    res.render('kecamatan',{
        title:'kecamatan',
        url:'postman/kecamatansaja.json'
    })
})
i.app.get('/showkota',(req,res)=>{
    res.render('kota',{
        title:'kota',
        url:'postman/kotasaja.json'
    })
})
i.app.get('/showstate',(req,res)=>{
    res.render('state',{
        title:'state',
        url:'postman/statesaja.json'
    })
})
i.app.get('/main',(req,res)=>{
    console.log('req cookie',req.cookies)
    res.render('logged',{
        session_id:req.cookies.session_id
    })
})
i.app.listen(20223,_=>{
    console.log('App run on port 20223')
})