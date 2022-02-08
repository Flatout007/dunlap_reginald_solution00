/*
Given a deck of cards, we have to deal a hand containing a certain number of cards. 
Cards can be dealt from the top of the deck as well as from the bottom. 
Determine the best hand that can be dealt, in terms of the sum of the values of the cards, 
assuming each card has a specific value.
Example: for the deck [3,1,1,6,2,6,9,2,5], 
we can deal a set of hands [x,x,x,x,x] , [x,x,x,x,x], [x,x,x,x,]. 
The best hand is [x,x,x,x,x] with a sum of y
Some clarifications:
Q: Does the dealer know the values of the cards in the deck and their order? 
A: Yes, assume complete knowledge of the deck
Q: How large can a hand be? A: The size limit is 1,000,000 cards
Q: Can the hand be empty? A: Yes. In that case, its value is 0
Q: What if there are not enough cards in the deck to build a hand of the requested size? 
A: Then the whole deck should be dealt
Tommy works at a shady casino and is a card dealer. He always wants to know who has the 
best set of cards when he has everyone playing at his table of 5. Given a deck of cards, 
with all face cards worth 10 points and each numbered card worth the number printed on the card,
he wants to determine the best hand that can be dealt, in terms of the sum of the value of the cards, 
if each player is dealt 5 cards.
Write a solution in any programming language that can determine the best hand and its sum that
tommy can deal on his table given a random set of cards given as a random array for input.
Please upload your solution to GitHub with a README that has any instructions and details needed 
for your application and send your results to brenda.murphy@f8-federal.com
*/
/**
 * input: 
 * 5 people at the table->p:number;
 * 
 * each person is dealt a hand of 5->n:number;
 * 
 * random set of cards->deck[];
 */
/**
 * output: 
 * print "the best hand is ```h:number[]``` with a sum of ```y:number``` "
 */
/**
 * Notes:
 * A Deck contains 4 suits of 2-10 + A,J,Q,K; 
 *
 * 1 suit->[2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K, A];
 * 
 * but, i'm just gonna use one suit for this problem
 * 
 */
/**
 * 
 * @param {number} p 
 * @param {number} n 
 * @param {number[]} deck 
 */
 class Dealer {
    constructor(deck) {
        this.deck = deck;
    }
    /**
     * @returns {number[]}
     */
    shuffle() {
        // randomizes the deck of cards;
        for (let i = this.deck.length - 1; i > 0; i--) {
            const r = Math.floor(Math.random() * (i * 1));
            const tmp = this.deck[i];
            this.deck[i] = this.deck[r];
            this.deck[r] = tmp;
        }

        return this.deck;
    }
}
/**
 * @param {number} p 
 * @param {number} n 
 * @param {number[]} deck 
 */
function bestHand(p, n, deck) { // O(n + j) with n being the size of deck and j the number of players
    if(n <= 0 || p <= 0 || deck <= 0) return 0;
    let h, y;
    let playerHands = {};
    let card = 0, numberOfCardsDealt = 0, i = 0;

    while(numberOfCardsDealt !== n*p) { 
        // deal each player a single card
       // if "this.deck.length" cards are dealt: randomize the next cards and deal them
        if(!playerHands[i]) playerHands[i] = [deck[card]];
        else playerHands[i].push(deck[card]);
        i++; card++;
        numberOfCardsDealt += 1;
        if(i >= p) i = 0; 
        if(card === deck.length) card = 0;
        if(numberOfCardsDealt === deck.length) {
             let dealer = new Dealer(deck);
             deck = dealer.shuffle();
        } 
    }
 
    [h, y] = bestSum(playerHands);
    
    console.log(`the best hand is ${h} with a sum of ${y}`);
}
/**
 * @param {number[]} arr 
 * @returns {number}
 */
function sum(arr) {
     let set = new Set(['A', 'J', 'Q', 'K']);
     return arr.reduce((acc, ele) => {
              if(set.has(ele)) ele = 10;
              return ele += acc;
            }, 0);
}
/**
 * @param {{}[]} hands 
 * @returns {Array[]} 
 */
function bestSum(hands) {
    let max = -Infinity;
    const n = Object.values(hands).length;
    for(let i = 0; i<n; i++) {
        max = Math.max(max, sum(hands[i]));
    }
    
    for(let i = 0; i<n; i++) {
        if(max === sum(hands[i])) return [hands[i], max];
    }
}

/* tests -------------------*/
let deck = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
let dealer = new Dealer(deck);
bestHand(5, 100, dealer.shuffle());

// let deck = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
// let dealer = new Dealer(deck);
// bestHand(100, 5, dealer.shuffle());

// let deck = [2, 9, 10, 'J', 'Q', 'K', 'A'];
// let dealer = new Dealer(deck);
// bestHand(5, 5, dealer.shuffle());

// let deck = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J'];
// let dealer = new Dealer(deck);
// bestHand(5, 5, dealer.shuffle());