/*

This file contains the class api that handles the processing 
and required calculations of the challenge

*/

class API{

    constructor()
    {
        this.watches_data = 
        [
            { id : '001', name:"Rolex", price:100,discount_ratio:3, discount_ratio_price:200},
            { id : '002', name:"Michael Kors", price:80,discount_ratio:2, discount_ratio_price:120},
            { id : '003', name:"Swatch", price:50,discount_ratio:0, discount_ratio_price:0},
            { id : '004', name:"Casio", price:30,discount_ratio:0, discount_ratio_price:0}

        ]

    }


    display_watches_data()
    {
        console.log(this.watches_data)
    }



    restructure_data(data_)
    {
        /*
            we need to restructure the data received so we can get a clear
            association between the id and the total number of items
        */

        var array_of_unique_objects=[]

        for (var i=0;i<data_.length;i++)
        {
            
                
            
            var object_to_push={}
            object_to_push["id"]=data_[i]
            object_to_push["total"]=1
            array_of_unique_objects.push(object_to_push)

            
        }
        
        return array_of_unique_objects
    }

    groupByNumber(data_)
    {
        /*

            Here the goal is to group the watch ids per number of items
        */

        let data_restructured =data_

        let map = data_restructured.reduce((prev, next) =>{
            if (next.id in prev) {
            prev[next.id].total += next.total;
            } else {
                prev[next.id] = next;
            }
            return prev;
        }, {});
        
        return  Object.keys(map).map(id => map[id]);
    }

    get_discounted_quantity(quantity,discount_ratio)
    {
        /*

            Here we want to get the quantity to discount
            i.e the number of times we want to apply the discount

        */

        if (discount_ratio>0)
        {
            if(discount_ratio > 0)
            {
                return Math.floor(quantity/discount_ratio)
            }
        }

    }

    get_total_per_id(id,grouped_by_number)
    {

        //Added this function to help during the testing 
        for (var i=0;i<grouped_by_number.length;i++)
        {
            if(id==grouped_by_number[i].id)
            {
                return grouped_by_number[i].total
            }
        }
    }

    sum(data_received)
    {
        /*

            Here we want to return the sum

        */

        var sum=0
        
        for (var i=0;i<data_received.length;i++)
        {
            for (var j=0;j<this.watches_data.length;j++)
            {
                if(data_received[i].id==this.watches_data[j].id)
                {
                    if(this.watches_data[j].discount_ratio>0)
                    {
                        
                        var quantity=data_received[i].total
                        var regular_price=this.watches_data[j].price
                        var discounted_price = this.watches_data[j].discount_ratio_price
                        var discount_ratio=this.watches_data[j].discount_ratio
                        
                        
                        
                        var discount_times=this.get_discounted_quantity(quantity,discount_ratio)
                        var discounted_quantity=discount_times*discount_ratio
                        var  regular_price_quantity = quantity-discounted_quantity
                        
                        var sum_regular_price = regular_price_quantity*regular_price
                        var sum_discount_price = discount_times*discounted_price
                        
                        sum+=sum_regular_price+sum_discount_price

                        
                    }
                    else
                    {
                        sum+=data_received[i].total*this.watches_data[j].price
                    }
                }
            }
            
            
        }
        
        return sum
    } 



}

module.exports=API

var api = new API()


let data=["001","001","001"]


//console.log(api.display_watches_data())
console.log("Adding id and total to data",api.restructure_data(data))
restructured_data= api.restructure_data(data)

data_grouped_by_number=api.groupByNumber(restructured_data)
console.log("Grouped by number",data_grouped_by_number)

console.log("Get discounted quantity",  api.get_discounted_quantity(3,2))

console.log("Sum",api.sum(data_grouped_by_number))
