const Modal = {
    open() {
        // Abrir modal
        // Adicionar a class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList.add('active')
    },
    close() {
        //fechar o modal
        //remover a class active do modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
}


const Transaction = {
    all: [{

        description: 'luz',
        amount: -50000,
        date: '23/01/2021',
    },
        {

            description: 'Website',
            amount: 500000,
            date: '23/01/2021'
        },
        {

            description: 'Internet',
            amount: -20000,
            date: '23/01/2021'
        },
        {

            description: 'App',
            amount: 200000,
            date: '23/01/2021'
        }
    ]
    ,

    add(transaction) {
        transaction.all.push(transaction)

        App.reload()
    },

    remove(index) {
        transaction.all.splice(index, 1)

        App.reload()
    },

    incomes() {

    },
    expenses() {

    },
    total() {

    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index) {

        const tr = document.createEvent('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)


        const html = `

        
        <tr>
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${transaction.amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
        <img src="./assets/assets/minus.svg" alt="Remover transação">
</td>
</tr>
        `

        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = "Soma das entradas"
        document
            .getElementById('expenseDisplay')
            .innerHTML = "Soma das saidas"
        document
            .getElementById('totalDisplay')
            .innerHTML = "Soma total"
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }

}


const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "_" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },

    formData() {
        console.log('formatar os dados')
    },

    validateFields() {
        const {description, amount, date} = Form.getValues()

        if (description.trim() === "" ||
            amount.trim() === "" ||
            date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos")
        }
    },
    submit(event) {
        event.preventDefault()

        Form.validateFields()

        Form.formatData()
    }
}

const App = {
    init() {
        transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()

    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}

App.init()

Transaction.remove(0)



