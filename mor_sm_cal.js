

let loanAmount;
let annualInterest;
let termOfLoanInYears;


function calculateMonthlyPayment() {
    loanAmount = parseFloat(document.getElementById('loan_amount').value);
    annualInterest = parseFloat(document.getElementById('interest_rate').value);
    termOfLoanInYears = parseFloat(document.getElementById('loan_years').value);

    if (loanAmount) {
        let monthlyInterestRate = annualInterest / (100 * 12);
        let numberOfPayments = termOfLoanInYears * 12;
        let denominator = Math.pow((1 + monthlyInterestRate), numberOfPayments) - 1;

        let monthlyPayment = (loanAmount * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numberOfPayments)) / denominator;
        if (monthlyPayment) {
            const formattedmonthlyPayment = formatCurrency(monthlyPayment);
            document.getElementById("monthly_id").innerHTML = "$" + formattedmonthlyPayment;
        }
    }
}


function formatCurrency(number) {
    return new Intl.NumberFormat('en-US', {
        // style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number);
}











function updateMortgage() {
    if (loanAmountDateType.dataset.type == "dollar") {
        // Get the source field element by ID



        let MortgageAmount = PV - DP;

        // Get the target field element by ID
        const targetField = document.getElementById('mortgage_amount');

        // Check if MortgageAmount is less than 0
        if (MortgageAmount < 0) {
            // Reset property value and down payment to zero
            propertyValueElement.value = "0";
            downPaymentElement.value = "0";
            targetField.value = "0";
            displayErrorMessage("Mortgage cannot go to negative.");

        } else if (MortgageAmount) {
            // Set the target field's value to the source field's value
            targetField.value = MortgageAmount;
            displayErrorMessage("");
        }
    }
}

function parseCurrencyString(currencyString) {
    // Remove commas and parse the number as a floating-point value
    const floatValue = parseFloat(currencyString.replace(/,/g, ''));

    // Round the floating-point value to the nearest integer
    return Math.round(floatValue);
}













//Donut Bar chart
let data = [20, 30, 50]; // You can adjust this data accordingly

let svg = d3.select('#donut-chart')
    .append('svg')
    .attr('width', 200)
    .attr('height', 200),
    width = +svg.attr('width'),
    height = +svg.attr('height'),
    radius = Math.min(width, height) / 2,
    g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

let color = d3.scaleOrdinal(['#1069b5', '#86c8ff', '#b9d2e8']); // colors for the sections

let pie = d3.pie();

let arc = d3.arc()
    .innerRadius(radius - 50)  // Adjust inner radius to make the donut hole smaller
    .outerRadius(radius - 10); // Adjust outer radius

let pieData = pie(data);

let arcs = g.selectAll('arc')
    .data(pieData)
    .enter()
    .append('g')
    .attr('class', 'arc');

arcs.append('path')
    .attr('d', arc)
    .style('fill', function (d) { return color(d.data); })
    .style('stroke', '#ffffff')   // Add white color stroke
    .style('stroke-width', '2');  // Specify stroke width






// Currency Format check
//Input Check and currency pattern


function displayErrorMessage(message) {
    const errorElement = document.getElementById("error_message");
    if (message) {
        errorElement.innerHTML = message;

        //STYLE
        errorElement.style.marginLeft = "10px";
        errorElement.style.borderRadius = "20px";
        errorElement.style.padding = "18px 0";
        errorElement.style.textAlign = "center";
        errorElement.style.maxWidth = "54%";
        errorElement.style.color = "#721c24";
        errorElement.style.backgroundColor = "#f8d7da";
        errorElement.style.borderColor = "#721c24";
    }
    else {
        errorElement.innerHTML = "";
        // Clear all styles
        errorElement.style.marginLeft = null;
        errorElement.style.borderRadius = null;
        errorElement.style.padding = null;
        errorElement.style.textAlign = null;
        errorElement.style.maxWidth = null;
        errorElement.style.color = null;
        errorElement.style.backgroundColor = null;
        errorElement.style.borderColor = null;
    }
}
function validateCurrencyInput(inputElement) {
    // Check if the input is a number
    if (inputElement.validity.badInput || inputElement.value === "") {
        displayErrorMessage("Please enter a valid number.");
        inputElement.value = "";
        inputElement.focus();
        return false;
    }

    // Remove all non-numeric characters (except the decimal point)
    const sanitizedInput = inputElement.value.replace(/[^\d.]/g, '');

    // Check for the currency pattern
    const currencyPattern = /^\d+(\.\d{0,2})?$/;
    if (!currencyPattern.test(sanitizedInput)) {
        displayErrorMessage("Please enter a valid positive currency value.");
        inputElement.value = "";
        inputElement.focus();
        return false;
    }

    // Format the input value as a currency string
    inputElement.value = formatCurrency(parseFloat(sanitizedInput));

    // Clear the error message
    displayErrorMessage("");

    return true;
}


// INCREASE AND DECREASE OF VALUE
function changeInputValue(direction, inputId) {
    // get the input element
    var inputElement = document.getElementById(inputId);
    
    // get the current value of the input element
    var currentValue = parseFloat(inputElement.value);
    
    // check if the current value is a valid number
    if (isNaN(currentValue)) {
        currentValue = 0;
    }

    // increase or decrease the current value based on the direction
    if (direction == 'up') {
        currentValue += 1;
    } else if (direction == 'down') {
        currentValue -= 1;
        if (currentValue < 0) { // prevent the value from going below zero
            currentValue = 0;
        }
    }
    
    // update the value of the input element
    inputElement.value = currentValue;

    // recalculate the monthly payment
    calculateMonthlyPayment();
}
