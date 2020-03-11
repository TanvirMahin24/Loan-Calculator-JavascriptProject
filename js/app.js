//Select the UI elements
const form = document.querySelector('#loan-form');


//Form submit button
form.addEventListener('submit',(e)=>{
    //Result element display none
    document.querySelector('#results').style.display = 'none';

    //Show Loder gif
    document.querySelector('#loading').style.display = 'block';

    //Calculate Result
    setTimeout(calculateResult, 1000);

    e.preventDefault();
});

//calculateResult() function body
function calculateResult(e) {
    //Form UI elements
    const amount = document.querySelector('#amount');
    const years = document.querySelector('#years');
    const interest = document.querySelector('#interest');
    const totalInterest = document.querySelector('#total-interest');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');

    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Monthly Payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principle * x * calculatedInterest) / (x - 1);

    //Results
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);

        //Result element display block
        document.querySelector('#results').style.display = 'block';

    }
    else {
        //Error Showing function
        showErr("Please Check your input...");
    }
    //Hide Loder gif
    document.querySelector('#loading').style.display = 'none';

}

//Error alert function
function showErr(error) {
    //Create a div
    const errDiv = document.createElement('div');

    //Get elements to append the errDiv
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add class
    errDiv.className = 'alert alert-danger';

    //Add the text
    errDiv.appendChild(document.createTextNode(error));

    //Insert the alert
    card.insertBefore(errDiv, heading);

    //Clear the alert after 3s
    setTimeout(clearErr , 3000);
}

//Clear Alert function body
function clearErr() {
 document.querySelector('.alert').remove();
}