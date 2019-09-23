var budgetController = (function (){

    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }


    var data = {

        allItems:{
            exp: [],
            inc: []
        },
        totals:{
            exp:0,
            inc:0
        },
        budget: 0,
        percentage:-1

    };

    var calculateTotal = function(type){
        var sum = 0;

        data.allItems[type].forEach(element => {
            sum += element.value;
        });

        data.totals[type] = sum;
    }

    return{
        addItem: function(type,des,val){

            var newItem, ID;

            if(data.allItems[type].length > 0){
                ID = data.allItems[type].length;
            }
            else{
                ID= 0
            }

            if(type === 'exp'){
                newItem = new Expense(ID,des,val);
            }    
            else{
                newItem = new Income(ID,des,val); 
            }

            data.allItems[type].push(newItem);

            return newItem;

        },
        calculateBudget:  function(){

            calculateTotal('exp');
            calculateTotal('inc');

            data.budget = data.totals.inc - data.totals.exp;

            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp/data.totals.inc) * 100);
            }
            else{
                data.percentage = -1;
            }
        },
        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        }

    }


})();

var UIController = (function(){

    var DOMStrings = {
        inputBtn: '.add__btn',
        inputValue: '.add__value',
        inputDescription: '.add__description',
        inputType: '.add__type',
        incomeContainer: '.income__list',
        expensesContainer:'.expenses__list',
        budgetValue:'.budget__value'
    };

    var formatNumber = function(num, type) {
        var numSplit, int, dec, type;
        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    };
    

    return{

        getInputs: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },
        getDOMStrings: function(){
            return DOMStrings;
        },
        addListItem: function(obj,type){

            var html, newHtml, element;

            if(type === 'inc'){
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
        },
        displayBudget:function(obj){
            document.querySelector(DOMStrings.budgetValue).textContent = formatNumber(obj.budget);
        }
    }
})();

var controller = (function (budgetCtrl,UICrtl){

    var setupEventListeners = function(){

        var DOM  = UICrtl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
        
        document.addEventListener('keypress',function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    };

    var updateBudget = function(){
        budgetCtrl.calculateBudget();
        var budget = budgetCtrl.getBudget();
        console.log(budget);
        UICrtl.displayBudget(budget);
    };

    var ctrlAddItem = function(){

        var input, newItem;

        input = UICrtl.getInputs();

        if( input.description !== "" && !isNaN(input.value) && input.value > 0){

            //1. add Item to Data
            newItem = budgetCtrl.addItem(input.type,input.description,input.value);

            //2. Add Item to List   
            UIController.addListItem(newItem,input.type);
        }

        updateBudget();
    };


    return {
        init: function() {
            console.log('Application has started.');
            UICrtl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };

})(budgetController,UIController);

controller.init();