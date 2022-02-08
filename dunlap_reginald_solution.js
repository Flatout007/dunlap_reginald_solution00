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
function bestHand(p, n, deck) { // O(n) with n being the size of deck
    if(n <= 0 || p <= 0 || deck <= 0) return 0;
    let h, y;
    let playerHands = {};
    let card = 0, numberOfCardsDealt = 0, i = 0;

    while(numberOfCardsDealt !== n*n) { 
        // deal each player a single card
       // if "this.deck.length" cards are dealt: randomize the next cards and deal them
        if(!playerHands[i]) playerHands[i] = [deck[card]];
        else playerHands[i].push(deck[card]);
        card++; i++;
        numberOfCardsDealt += 1;
        if(i === n) i = 0; card = 0;
        if(numberOfCardsDealt === deck.length - 1) {
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
 * @returns {number[]} 
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
bestHand(5, 5, dealer.shuffle());

// let deck = [2, 9, 10, 'J', 'Q', 'K', 'A'];
// let dealer = new Dealer(deck);
// bestHand(5, 5, dealer.shuffle());

// let deck = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J'];
// let dealer = new Dealer(deck);
// bestHand(5, 5, dealer.shuffle());