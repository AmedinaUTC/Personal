var  budgetController = (function (){

    var data = {
        allItems:{
            inc:[1000,200],
            exp:[30,90,100,50]
        }
    }

    return {

        getData: function(){
            return data;
        }

    }

})();

var UIController = (function (){

})();

var controller = (function (budgetCtrl,UICtrl){


    return {

        getData: function(){
            return budgetController.data;
        }

    }

})(budgetController,UIController);
