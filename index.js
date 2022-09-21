var i = require('./js/initapp')
i.app.get('/getclients',(req,res)=>{
    i.rest.getClient({},obj=>{
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
        console.log(obj)
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
    i.rest.getSubscription({},obj=>{
        res.render('data',{
            title:'Subscription',
            url:'getsubscription'
        })
    })
})
i.app.get('/showtickets',(req,res)=>{
    res.render('tickets/index',{
        title:'Tickets',
        url:'gettickets/1/10'
    })
})
i.functables.functs.forEach(element => {
    i.app.get('/'+element,(req,res)=>{
        i.rest[element]
        res.send({"response":element})
    })
});
i.app.listen(20223,_=>{
    console.log('App run on port 20223')
})