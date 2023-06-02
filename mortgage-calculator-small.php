<?

/**
 * Plugin Name: Mortgage Calculator
 * 
 */

function enqueueScripts()
{
    wp_register_style('calculatorstyle', plugins_url('/style.css', __FILE__), array(), false);
    wp_register_script('smcalscripts', plugins_url('/mor_sm_cal.js', __FILE__), [], false, false);
    wp_register_script('libscripts','https://d3js.org/d3.v5.min.js', [], false, false);

}
add_action("wp_enqueue_scripts", 'enqueueScripts');



function runSmallCalculator()
{
    wp_enqueue_script('smcalscripts');
    wp_enqueue_script('libscripts');
    wp_enqueue_style('calculatorstyle');
    $html = '
    <div class="both_col">
        <div class="col_1">
            <div class="an_loan_amount field">
                <label for="loan_amount_label">Enter Loan Amount</label><br>
                <div class="loan_amount_input">
                    <span class="la_span">$</span>
                    <input class="CurrencyInput input_feild" placeholder="" type="text" name="" id="loan_amount"
                        data-type="dollar" min="0" oninput="" onchange="validateCurrencyInput(this)" required>
                    <i class="fa-solid fa-chevron-up" onclick="changeInputValue(\'up\', \'loan_amount\')"></i>
                    <i class="fa-solid fa-chevron-down " onclick="changeInputValue(\'down\', \'loan_amount\')"></i>
                </div>
            </div>
            <div class="an_interest_rate field">
                <label for="interest_rate_label">Enter Annual Interest Rate</label><br>
                <div class="interest_rate_input">
                    <span class="ir_span">%</span>
                    <input class="interestinput input_feild" placeholder="" type="text" name="" id="interest_rate"
                        data-type="percentage" min="0" onchange="validateInterestRate()" required>
                    <i class="fa-solid fa-chevron-up " onclick="changeInputValue(\'up\', \'interest_rate\')"></i>
                    <i class="fa-solid fa-chevron-down " onclick="changeInputValue(\'down\', \'interest_rate\')"></i>
                </div>
            </div>

            <div class="an_loan_years field">
                <label for="loan_years_label">Enter Term of Loan in Years</label><br>
                <div class="loan_years_input">
                    <span class="yr_span">Y</span>
                    <input class="yearinput input_feild" placeholder="" type="text" name="" id="loan_years"
                        data-type="dollar" min="0" onchange="calculateMonthlyPayment()" required>
                    <i class="fa-solid fa-chevron-up" onclick="changeInputValue(\'up\', \'loan_years\')"></i>
                    <i class="fa-solid fa-chevron-down" onclick="changeInputValue(\'down\', \'loan_years\')"></i>
                </div>
            </div>
            <div class="an_additional_amount field">
                <label for="additional_amount_label">Enter Additional Amount</label><br>
                <div class="additional_amount_input">
                    <span class="aa_span">$</span>
                    <input class="CurrencyInput input_feild" placeholder="" type="text" name="" id="additional_amount"
                        data-type="dollar" min="0" oninput=""
                        onchange="validateCurrencyInput(this) ,calculateMonthlyPayment()" required>
                    <i class="fa-solid fa-chevron-up" onclick="changeInputValue(\'up\', \'additional_amount\')"></i>
                    <i class="fa-solid fa-chevron-down" onclick="changeInputValue(\'down\', \'additional_amount\')"></i>
                </div>
            </div>
        </div>
        <div class="col_2">
            <div class="monthly">
                <p class="monthly_p">Monthly Payments</p>
                <div class="monthly_div">
                    <p id="monthly_id"></p>
                </div>
            </div>
            <div class="monthly_extra">
                <p class="monthly_extra_p">Monthly Payments & Extra Payment</p>
                <div class="monthly_extra_div">
                    <p id="monthly_extra_id"></p>
                </div>
            </div>
            <div class="chart_div">
                <div id="donut-chart"></div>
                <p class="chart_p">Break-down of Monthly Payment</p>
            </div>
            <div class="btn_more_option">
                <button class="">MORE OPTIONS</button>
            </div>
        </div>
    </div>';
    return $html;
}
add_shortcode('runSmallCalculator', 'runSmallCalculator');
