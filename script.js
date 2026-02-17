let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
    const text = document.getElementById("text").value;
    const amount = document.getElementById("amount").value;

    if (text === "" || amount === "") {
        alert("Please enter all fields");
        return;
    }

    const transaction = {
        id: Date.now(),
        text,
        amount: +amount
    };

    transactions.push(transaction);
    updateLocalStorage();
    document.getElementById("text").value = "";
    document.getElementById("amount").value = "";
    showTransactions();
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    showTransactions();
}

function showTransactions() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    let total = 0;

    transactions.forEach(transaction => {
        total += transaction.amount;

        const li = document.createElement("li");
        li.className = transaction.amount > 0 ? "income" : "expense";

        li.innerHTML = `
            ${transaction.text} 
            ₹${transaction.amount}
            <button onclick="deleteTransaction(${transaction.id})">X</button>
        `;

        list.appendChild(li);
    });

    document.getElementById("balance").innerText = `₹${total}`;
}

showTransactions();
