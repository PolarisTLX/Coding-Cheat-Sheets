Chapter 9 of Eloquent JavaScript.

IF THERE IS ONLY 1 OF AN ITEM LEFT, REMOVE THE "s":

    var stock = "1 lemon, 2 cabbages, and 101 eggs";
    // pattern is number of any digits length, then a space, then word of any characters length
    var pattern = /(\d+) (\w+)/g;

NOTE:  Each () in the pattern above is provided as an argument to the functin,
and the order of the ()s is important in this case.

    function minusOne(match, amount, unit) {
      console.log(arguments);

      //reduce number by 1:  (needs to be converted from string first)
      amount = Number(amount) - 1;
      // if only 1 left, remove the "s":
      if (amount == 1) {
        unit = unit.slice(0, unit.length -1);
      }
      else if (amount == 0) {
        amount = "no";
      }
      return amount + " " + unit;
    }

    console.log(stock.replace(pattern, minusOne));
    // no lemon, 1 cabbage, and 100 eggs

NOT SURE HOW the function recognizes the number as "amount" and the name as "unit"
"match" is an object containing info of all matches.


function lloan(test1, test2){
    //console.log(arguments);
    console.log(test2.toUpperCase());
}

lloan(test2 = 'hello', test1 = 'test');  //TEST
console.log(lloan('hello', 'test')); //TEST

Seems that saying "test2 = 'hello'" does nothing. It only matters what order they were provided



Toying with it to better understand:

    var stock = "1 lemon zest, 2 cabbages rolls, and 101 eggs whites";
    // pattern is number of any digits length, then a space, then word of any characters length
    var pattern = /(\d+) (\w+) (\w+)/g;

    function minusOne(match, amount, unit, type) {
      console.log(match);  // 1 lemon zest (first round only)
      console.log(amount); // 1
      console.log(unit);   // lemon
      console.log(type);   // zest

      //reduce number by 1:  (needs to be converted from string first)
      amount = Number(amount) - 1;
      // if only 1 left, remove the "s":
      if (amount == 1) {
        unit = unit.slice(0, unit.length -1);
      }
      else if (amount == 0) {
        amount = "no";
      }
      return amount + " " + unit + " " + type;
    }

    console.log(stock.replace(pattern, minusOne));

          1 lemon zest
          1
          lemon
          zest
          2 cabbages rolls
          2
          cabbages
          rolls
          101 eggs whites
          101
          eggs
          whites

          no lemon zest, 1 cabbage rolls, and 100 eggs whites


  stock.replace(pattern, minusOne) =:
    stock = string being tested
    pattern = what we are looking for in the string
    minusOne = what that will be replaced with

  for minusOne, which is a function:
      functin minusOne(match, amount, unit, type)
  (because there is a "g") this will be EACH pattern matched in the string you get:
    -First argument (what was matched)
    -+another argument for each "()" in that pattern, in order of appearence
      var pattern = /(\d+) (\w+) (\w+)/g;
      since pattern has (\d+) (\w+) (\w+), that is 3 more arguments:

      function minusOne(part of string that matches the pattern, (1), (2), (3))
