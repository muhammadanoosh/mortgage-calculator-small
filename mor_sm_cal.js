

let loanAmount;
let annualInterest;
let termOfLoanInYears;
let additionalamount;
let monthlyPayment;
generateChart([50, 50], ['#1069b5', '#86c8ff']);
function calculateMonthlyPayment() {
    loanAmount = document.getElementById("loan_amount").value;
    const loanAmountValue = parseCurrencyString(loanAmount);
    annualInterest = parseFloat(document.getElementById('interest_rate').value);
    termOfLoanInYears = parseFloat(document.getElementById('loan_years').value);
    additionalamount = document.getElementById("additional_amount").value;
    const additionalamountValue = parseCurrencyString(additionalamount);
    if (loanAmountValue && annualInterest && termOfLoanInYears) {
        let numerator = loanAmountValue + ((annualInterest * loanAmountValue / 100) * termOfLoanInYears)
        let denomenator = termOfLoanInYears * 12
        monthlyPayment = numerator / denomenator
        if (monthlyPayment) {
            const formattedmonthlyPayment = formatCurrency(monthlyPayment);
            document.getElementById("monthly_id").innerHTML = "$" + formattedmonthlyPayment;
        }
        if (additionalamountValue) {
            const formattedmonthlyAndExtra = formatCurrency(additionalamountValue);
            document.getElementById("monthly_extra_id").innerHTML = "$" + formattedmonthlyAndExtra;
            removeChart();
            generateChart([monthlyPayment, additionalamountValue], ['#1069b5', '#86c8ff']);
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









function parseCurrencyString(currencyString) {
    // Remove commas and parse the number as a floating-point value
    const floatValue = parseFloat(currencyString.replace(/,/g, ''));

    // Round the floating-point value to the nearest integer
    return Math.round(floatValue);
}













//Donut Bar chart

function generateChart(data, colorMap) {
    let svg = d3.select('#donut-chart')
        .append('svg')
        .attr('width', 200)
        .attr('height', 200),
        width = +svg.attr('width'),
        height = +svg.attr('height'),
        radius = Math.min(width, height) / 2,
        g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    let color = d3.scaleOrdinal(colorMap); // colors for the sections

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
        .style('fill', function (d, i) { return color(i); }) // color is mapped to the index now
        .style('stroke', '#ffffff')   // Add white color stroke
        .style('stroke-width', '2');  // Specify stroke width

    // To center the donut chart on the page, add CSS
    d3.select('#donut-chart')
        .style('display', 'flex')
        .style('justify-content', 'center')
        .style('align-items', 'center');
}
function removeChart() {
    d3.select('#donut-chart').select('svg').remove();
}


// Call the function with your data and color map








// Currency Format check
//Input Check and currency pattern


// function displayErrorMessage(message) {
//     const errorElement = document.getElementById("error_message");
//     if (message) {
//         errorElement.innerHTML = message;

//         //STYLE
//         errorElement.style.marginLeft = "10px";
//         errorElement.style.borderRadius = "20px";
//         errorElement.style.padding = "18px 0";
//         errorElement.style.textAlign = "center";
//         errorElement.style.maxWidth = "54%";
//         errorElement.style.color = "#721c24";
//         errorElement.style.backgroundColor = "#f8d7da";
//         errorElement.style.borderColor = "#721c24";
//     }
//     else {
//         errorElement.innerHTML = "";
//         // Clear all styles
//         errorElement.style.marginLeft = null;
//         errorElement.style.borderRadius = null;
//         errorElement.style.padding = null;
//         errorElement.style.textAlign = null;
//         errorElement.style.maxWidth = null;
//         errorElement.style.color = null;
//         errorElement.style.backgroundColor = null;
//         errorElement.style.borderColor = null;
//     }
// }
function validateCurrencyInput(inputElement) {
    // Check if the input is a number
    if (inputElement.validity.badInput || inputElement.value === "") {
        // displayErrorMessage("Please enter a valid number.");
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
    // displayErrorMessage("");

    return true;
}


// INCREASE AND DECREASE OF VALUE
function changeInputValue(direction, inputId) {
    // get the input element
    var inputElement = document.getElementById(inputId);

    // get the current value of the input element
    var currentValueString = inputElement.value.replace(/[^0-9.-]+/g, ""); // remove currency symbol and other non-number characters

    // parse the current value to a number
    var currentValue = parseFloat(currentValueString);

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

    // convert the value back to a string with a currency symbol
    var newValueString = currentValue.toFixed(0);

    // update the value of the input element
    inputElement.value = newValueString;

    // recalculate the monthly payment
    calculateMonthlyPayment();
}


function validateInterestRate() {
    // Get the input element
    var interestRateElement = document.getElementById('interest_rate');

    // Check if the value is empty
    if (interestRateElement.value === "") {
        // If it's empty, set it to 5%
        interestRateElement.value = "5";
    }

    // Check if the value is outside the range 1-100
    var interestRateValue = parseFloat(interestRateElement.value);
    if (isNaN(interestRateValue) || interestRateValue < 1 || interestRateValue > 100) {
        // If it's outside the range, set it to 5%
        interestRateElement.value = "5";
    }
}