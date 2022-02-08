Hello, 

This solution takes in ```bestHand(people, n, random deck)```, deals `n` cards to `n` amount of people, and 
prints ```"the best hand is ${h} with a sum of ${y}"```.

Algorithim:

- Dealer is a class that is used to shuffle the deck/array of cards.

- After the array is shuffled initailly, the dealer deals all cards, 
shuffling again if ```deck.length-1``` cards are delt.

- The max sum is then calculated by ```bestSum()``` and returned as an array along with the current hand.

- Finally, the system prints ```"the best hand is ${h} with a sum of ${y}"```;

A basic test case would be: 
```cs
    let deck = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    let dealer = new Dealer(deck);
    bestHand(5, 5, dealer.shuffle()) 
```