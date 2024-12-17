"use strict";

const body = document.querySelector('body');
const labelBalance = document.querySelector('.balance__value');
const btnTransfer = document.querySelector('.form__btn--transfer');
const balance = document.querySelector('.balance');
const downNav = document.querySelector('.down--nav');
const operationClose = document.querySelector('.operation--close');
const containerAction = document.querySelector('.container--action')
const summaryConatiner = document.querySelector('.summary')
const homeClick = document.querySelector('.home__click');

const loginBtn = document.querySelector(".login__btn");

const transactionHistory = document.querySelector('.transaction--history');
  

const welcome = document.querySelector('.welcome');


const transactionClick = document.querySelector('.transaction__click')
const operation = document.querySelector('.operation');
const operationLoan = document.querySelector('.operation--loan');
const formContainer = document.querySelector("form");
const inputLoginUsername = document.querySelector('.login__input--user');
const summary = document.querySelector('.summary__value--in')
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const labelWelcome = document.querySelector('.welcome');
const containerApp = document.querySelector('.app');
const logo = document.querySelector('.logo');
const containerMovements = document.querySelector('.movements');
const btnLogout = document.querySelector(".btn--logout");


const account1 = {
    owner: 'Favor Smith',
    movements: [],
    interestRate: 1.2, // %
    pin: 1111,
};
  
const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};
  
const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [],
    interestRate: 0.7,
    pin: 3333,
};
  
const account4 = {
    owner: 'Sarah Smith',
    movements: [],
    interestRate: 1,
    pin: 4444,
};


const account5 = {
  owner: 'Peter Chase',
  movements: [],
  interestRate: 1,
  pin: 8888,
};

const account6 = {
  owner: 'Thomas Frank',
  movements: [2000,5, 100, -200, -10, 1000, 300],
  interestRate: 1,
  pin: 7658,
};


const account7 = {
  owner: 'Brenda Jaster',
  movements: [500, 5],
  interestRate: 1,
  pin: 5555,
};


const allAccts = [account1, account2, account3, account4, account5, account6, account7];



// const accountInStorage = localStorage.setItem("acctsInLocal", JSON.stringify(allAccts));


// const accounts = JSON.parse(localStorage.getItem("acctsInLocal"));

const accounts = JSON.parse(localStorage.getItem("acctsInLocal"));

if(!accounts) accountInStorage = localStorage.setItem("acctsInLocal", JSON.stringify(allAccts));

const createUsername = (accts)=>{
    accts.forEach((acct)=> {
        acct.username = acct.owner.split(" ").map((name)=> name.slice(0, 1).toLowerCase()).join("")
    });
}

createUsername(allAccts);





const currentUser =[];



const updateUI = function (message, opacity1, opacity0, btnDisplay){
    labelWelcome.textContent = `${message}`
    containerApp.style.opacity = `${opacity1}`
    formContainer.style.opacity = `${opacity0}`;
    btnLogout.style.display = `${btnDisplay}`;
}



const showUserBalance = function (isUser){
  
    isUser.balance = isUser.movements.reduce((acc, curr)=>{
      return acc + curr;
    }, 0)
    
    labelBalance.textContent = `${isUser.balance}$`;
}



const updateUserTransaction = function (isUser){
  // const  = currentUser[0];

  containerMovements.innerHTML= ""

  if(isUser.movements.length === 0){
    const El = document.createElement("p");

    El.textContent = "No transactions yet."

    El.classList.add("noTransactions")
    containerMovements.insertAdjacentElement("beforeend", El);

  }else{
    
  isUser.movements.forEach((mov)=> {

    const isGreaterThanZero = mov > 0? "deposit": "withdrawal";
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${isGreaterThanZero}"> 2 ${isGreaterThanZero}</div>
          <div class="movements__date">Just now</div>
          <div class="movements__value">${mov}$</div>
        </div>
    
    `
    containerMovements.insertAdjacentHTML("beforeend", html);
  })


  const moneyIn = function (currentUser){

    currentUser.balance = currentUser.movements.reduce((acc, curr)=>{
      return acc + curr;
    }, 0)
    
    labelBalance.textContent = `${isUser.balance}$`;
  }


  
}
}

const checkUserLogin = function (accounts){

    formContainer.addEventListener('submit', (e)=>{
        e.preventDefault();
      
        const username = inputLoginUsername.value.toLowerCase();
        const userPin = Number(inputLoginPin.value);

      
       const isUser = accounts.find((user)=> user.username === username);

       if(!isUser){
        alert("Invalid username or password!")
       }else{
        if(userPin !== isUser.pin){
            alert("Password is incorrect");
          }else{
            formContainer.reset();
            inputLoginPin.blur();

            localStorage.setItem("loggedInUser", JSON.stringify(isUser));
            const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
            if(!loggedInUser) return;
            currentUser.push(loggedInUser);

            console.log(currentUser)
                            
            updateUI(`Welcome back, ${loggedInUser.owner}`, 1, 0,"block")
            showUserBalance(loggedInUser);
            updateUserTransaction(loggedInUser);

          }
       }
    })
}

const userLogout = function (currentUser){
    btnLogout.addEventListener("click", (e)=>{
      e.preventDefault();
      currentUser.length = 0;
      inputLoginUsername.focus();
      logo.style.display = "block"
      body.style.backgroundImage = "visible"
      updateUI("Log in to get started", 0, 1,"none");
      localStorage.removeItem("loggedInUser")
    })

}
  
userLogout(currentUser);


checkUserLogin(accounts)










const transferMoney = function (accounts, currentUser){
  btnTransfer.addEventListener("click", (e)=>{
    e.preventDefault();
    if(!currentUser) return;


    const inputTransferToValue = inputTransferTo.value;
    const inputTransferAmountValue = Number(inputTransferAmount.value);

    const isUserExisting = accounts.find((acct)=> acct.username === inputTransferToValue)

    if(!isUserExisting){
     alert("User does not exist")
    }else if(isUserExisting && isUserExisting.username === currentUser[0].username){
       alert("You can't transfer to yourself")
    }else{
      if(inputTransferAmountValue > currentUser[0].balance || currentUser[0].balance <= 0){
        alert("Insufficient funds")
      }else{

        isUserExisting.movements.push(inputTransferAmountValue)
        currentUser[0].movements.push(Number(`-${inputTransferAmountValue}`))


       const loggedInUser =  JSON.parse(localStorage.getItem("loggedInUser"))

       console.log(loggedInUser.movements)
      //  const updatedLoggedInUser = 
       loggedInUser.movements.push(Number(`-${inputTransferAmountValue}`));


       
       localStorage.removeItem("loggedInUser");
       localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
       const updatedloggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
       
       console.log(accounts)


       const newAcct = accounts.filter((acct)=> acct.username !== currentUser[0].username);

       const updatedUsers = [...newAcct, updatedloggedInUser]

       localStorage.removeItem("acctsInLocal")

       localStorage.setItem("acctsInLocal", JSON.stringify(updatedUsers));
       
      //  const accounts = JSON.parse(localStorage.getItem("acctsInLocal"));

        

        function updateUserTransaction(currentUser){

          containerMovements.innerHTML= ""
          currentUser[0].movements.forEach((mov)=> {
            const isGreaterThanZero = mov > 0? "deposit": "withdrawal";
            const html = `
                <div class="movements__row">
                  <div class="movements__type movements__type--${isGreaterThanZero}">2 ${isGreaterThanZero}</div>
                  <div class="movements__date">3 days ago</div>
                  <div class="movements__value">${mov}€</div>
                </div>
            
            `
            containerMovements.insertAdjacentHTML("beforeend", html);
          })

        
          function showUserBalance(currentUser){
        
              currentUser[0].balance = currentUser[0].movements.reduce((acc, curr)=>{
              return acc + curr;
            }, 0)
            
            labelBalance.textContent = `${currentUser[0].balance}$`;
          }
        
          showUserBalance(currentUser)
        
        }

        updateUserTransaction(currentUser)

        inputTransferTo.value = ""
        inputTransferAmount.value = ""
      }
    }

  })


  transactionClick.addEventListener('click', (e)=>{
    containerMovements.style.display = "block";
    operation.style.visibility = "hidden";
    operationLoan.style.visibility = "hidden";
    balance.style.visibility = "hidden";
    operationClose.style.visibility = "hidden";
    labelBalance.style.visibility = "hidden";
    containerAction.style.visibility = "hidden";
    summaryConatiner.style.visibility = "visible";  
    welcome.style.visibility = "hidden";  
    btnLogout.style.visibility = "hidden";  
    transactionHistory.style.visibility = "visible";  
    containerApp.style.backgroundColor = `${rgba(0, 0, 0, 0)}`
  
  })
  
  homeClick.addEventListener('click', (e)=>{
    containerMovements.style.display = "none";
    // containerApp.style.visibility = "visible"
    operation.style.visibility = "visible";
    operationLoan.style.visibility = "visible";
    balance.style.visibility = "visible";
    operationClose.style.visibility = "visible";
    containerAction.style.visibility = "visible";
    labelBalance.style.visibility = "visible";
    summaryConatiner.style.visibility = "hidden";
    welcome.style.visibility = "visible";  
    btnLogout.style.visibility = "visible"; 
    transactionHistory.style.visibility = "hidden";  
    containerApp.style.backgroundColor = `${rgba(0, 0, 0, 0)}`
  
  })
  
}



transferMoney(accounts, currentUser)

