/*

This file contains the class api that handles the processing 
and required calculations of the challenge

*/

class API {

    constructor() {

        this.watches_data =
            [
                { id: '001', name: "Rolex", price: 100, discount_ratio: 3, discount_ratio_price: 200 },
                { id: '002', name: "Michael Kors", price: 80, discount_ratio: 2, discount_ratio_price: 120 },
                { id: '003', name: "Swatch", price: 50, discount_ratio: 0, discount_ratio_price: 0 },
                { id: '004', name: "Casio", price: 30, discount_ratio: 0, discount_ratio_price: 0 }

            ]

    }




    restructure_data(data_) {

        /*
            we need to restructure the data received so we can get a clear
            association between the id and the total number of items
        */

        var array_of_unique_objects = []

        for (var i = 0; i < data_.length; i++) {



            var object_to_push = {}
            object_to_push["id"] = data_[i]
            object_to_push["total"] = 1
            array_of_unique_objects.push(object_to_push)

        }

        return array_of_unique_objects
    }


    get_number_of_items(id, data_) {

        for (var i = 0; i < data_.length; i++) {

            if (data_[i].id === id) {
                return 1
            }

        }

        return 0

    }


    update_number_of_items(id, data_) {

        for (var i = 0; i < data_.length; i++) {

            if (data_[i].id === id) {
                data_[i].total += 1
            }

        }

        return data_

    }


    add_item_to_array(id, data_) {

        data_.push({ 'id': id, total: 1 })

        return data_

    }



    group_by_number(data_) {
        /*
            Here the goal is to group the watch ids per number of items
        */

        var data_restructured = data_
        let new_data_array = []


        for (var i = 0; i < data_restructured.length; i++) {



            var number = this.get_number_of_items(data_restructured[i].id, new_data_array)


            if (number > 0) {
                new_data_array = this.update_number_of_items(data_restructured[i].id, new_data_array)
            }
            else {

                new_data_array = this.add_item_to_array(data_restructured[i].id, new_data_array)
            }

        }

        return new_data_array

    }

    get_number_of_discounts(quantity, discount_ratio) {
        /*

            Here we want to get the quantity to discount
            i.e the number of times we want to apply the discount

        */

        if (discount_ratio > 0) {


            return Math.floor(quantity / discount_ratio)

        }

    }


    get_total_per_id(id, grouped_by_number) {

        /*
            Function to help during the testing

        */

        for (var i = 0; i < grouped_by_number.length; i++) {
            if (id === grouped_by_number[i].id) {
                return grouped_by_number[i].total
            }
        }
    }



    get_equal_id_from_list(id_list1) {

        for (var j = 0; j < this.watches_data.length; j++) {

            if (id_list1 === this.watches_data[j].id) {
                return true
            }
        }

        return false
    }

    sum(data_received) {
        /*

            Here we want to return the sum

        */

        var sum = 0

        for (var i = 0; i < data_received.length; i++) {

            var current_id = this.watches_data[i].id
            var current_watch_discount = this.watches_data[i].discount_ratio
            var found_id = this.get_equal_id_from_list(current_id)



            if (found_id && current_watch_discount > 0) {

                var quantity = data_received[i].total
                var regular_price = this.watches_data[i].price
                var discounted_price = this.watches_data[i].discount_ratio_price
                var discount_ratio = this.watches_data[i].discount_ratio



                var discount_times = this.get_number_of_discounts(quantity, discount_ratio)
                var discounted_quantity = discount_times * discount_ratio
                var regular_price_quantity = quantity - discounted_quantity

                var sum_regular_price = regular_price_quantity * regular_price
                var sum_discount_price = discount_times * discounted_price

                sum += sum_regular_price + sum_discount_price


            }
            else {

                sum += data_received[i].total * this.watches_data[i].price
            }




        }

        return sum
    }



}

module.exports = API


