
module.exports = function Collection(oldCollection){

    this.reviews = oldCollection.reviews || {};
    this.totalQuantity = oldCollection.totalQuantity || 0;

    this.add = function (review, id) {
        var storedReview = this.reviews[id];
        if(!storedReview){
            storedReview = this.reviews[id] = {review: review, quantity: 0, rating: 0, description: this.description, imagePath: this.imagePath};
        }
        storedReview.quantity++;
        storedReview.rating = storedReview.review.rating;
        storedReview.description = storedReview.review.description;
        storedReview.imagePath = storedReview.review.imagePath;
        this.totalQuantity++;

    };

    this.reduceOneReview = function (id){
        this.reviews[id].quantity--;
        this.totalQuantity--;

        if(this.reviews[id].quantity <=0){
            delete this.reviews[id];
        }
    }

    this.removeReview = function (id){
        this.totalQuantity -= this.reviews[id].quantity;
        delete this.reviews[id];
    };

    this.generateArray = function (){
        var array = [];
        for(var id in this.reviews){
            array.push((this.reviews[id]));
        }
        return array;
    };


};