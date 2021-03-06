var events = require('events');

function Account() {
	this.balance = 0;
	events.EventEmitter.call(this); // line 1/2 of adding events directly to javascript object
	this.deposit = function(amount) {
		this.balance += amount;
		this.emit('balanceChanged');
	};
	this.withdraw = function(amount) {
		this.balance -= amount;
		this.emit('balanceChanged');
		
	};
}

Account.prototype.__proto__ = events.EventEmitter.prototype; // line 2/2 of adding events directly to javascript object
function displayBalance(){
	console.log("Account balance: $%d", this.balance)
}

function checkOverdraw() {
	if(this.balance < 0){
		console.log("account overdrawn!");
	}
}

function checkGoal(acc, goal){
	if(acc.balance > goal){
		console.log("goal achieved!");
	}
}

var account = new Account();
account.on("balanceChanged", displayBalance);
account.on("balanceChanged", checkOverdraw);
account.on("balanceChanged", function(){
	checkGoal(this, 1000);
});

account.deposit(220);
account.deposit(320);
account.deposit(600);
account.withdraw(1200);