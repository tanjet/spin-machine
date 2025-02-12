// 1. Deposit some money
//2. Determine number of lines to bet
// 3. Collect a bet amount
// 4. Roll/spin the slot machine
// 5. Check if the user has won
// 6. Give them the winnings
//7. play again

//function deposit(){
    // return 1
//}
//another way of doing a function
const prompt=require("prompt-sync")();

// global variables 
const ROWS = 3;
const COLS=3;

const SYMBOLS_COUNT ={
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}


const SYMBOL_VALUES ={
    "A" :5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}

const deposit =() =>{
        while(true){
        const depositAmount =prompt("Enter a deposit amount: ")
        //by default its a string so we have to change that to float or int
        const numberDepositAmount= parseFloat(depositAmount);

        if (isNaN(numberDepositAmount)|| numberDepositAmount<=0){
            console.log("Invalid deposit amount, try again. ");
        }else{
            return numberDepositAmount;
        }
            
    }
};

const getNumberofLines =() =>{
    while(true){
        const numberOfLines =prompt("Enter the number of lines to bet on (1-3): ");
        //by default its a string so we have to change that to float or int
        const numberofLines= parseFloat(numberOfLines);

        if (isNaN(numberOfLines)|| numberOfLines<=0 || numberOfLines >3){
            console.log("Invalid dnumber of lines, try again. ");
        }else{
            return numberOfLines;
        }
            
    }

}
// collecting a bet amount
const getBet =(balance, lines) =>{
    while(true){
        const bet =prompt("Enter the bet per line: ")
        //by default its a string so we have to change that to float or int
        const numberBet= parseFloat(bet);

        if (isNaN(numberBet)|| numberBet<=0 || numberBet> balance/lines){
            console.log("Invalid bet amount, try again. ");
        }else{
            return numberBet;
        }
            
    }
};
// spin the slot machine

const spin =() =>{
    const symbols =[];
    for (const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol); // push pushes elements into array

        }
    }
    const reels=[];
    for(let i=0;i<COLS;i++){
        reels.push([])
        const reelSymbols=[...symbols];//symbols will be called into the array
        
        for(let j=0; j<ROWS; j++){
            const randomIndex=Math.floor(Math.random()* reelSymbols.length);
           const selectedSymbol= reelSymbols[randomIndex];
           reels[i].push(selectedSymbol);
           reelSymbols.splice(randomIndex,1)//splice removes the element
        }

    }
    return reels;
};

const transpose=(reels) =>{
    const rows=[];
    for(let i=0;i<ROWS; i++){
        rows.push([]);
        for (let j=0; j<COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows
}

const printrows=(rows)=>{
    for (const row of rows){
        let rowString="";
        for(const[i,symbol] of row.entries()){
            rowString+=symbol
            if(i!=row.length-1){
                rowString +=" | "
            }
        }
        console.log(rowString)
    }
}

const getWinnings=(rows,bet,lines) =>{
    let winnings=0;
    for (let row=0; row<lines; row++){
        const symbols=rows[row];
        let allSame=true;
        for( const symbol of symbols ){
            if(symbol != symbols[0]){
                allSame=false;
                break;
            }
           if(allSame){
            winnings+=bet * SYMBOL_VALUES[symbols[0]]
           } 
        }

    }

    return winnings;

}

const game=() =>{

        let balance = deposit(); // let lets change the variables
        while(true){
            console.log("You have a balance of $" +balance)
            const numberOfLines=getNumberofLines(); //constant does not let change the variables later on
            const bet=getBet(balance,numberOfLines);
            balance-=bet*numberOfLines;
            const reels=spin();
            const rows=transpose(reels)
            console.log(reels);
            console.log(rows);
            printrows(rows);
            const winnings=getWinnings(rows,bet,numberOfLines)
            balance+=winnings;
                console.log("You won, $" +winnings.toString());
            if(balance<=0){
                console.log("You ran out of money");
                break;
            }
            const playAgain =prompt("Do you want to play again (y/n)");
            if (playAgain!= "y") break;
        }
}

game();
