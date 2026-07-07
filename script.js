let myChart = null;

function calculate() {
    // Inputs
    const salary = parseFloat(document.getElementById('salary').value) || 0;
    const expense = parseFloat(document.getElementById('expense').value) || 0;
    const emergency = parseFloat(document.getElementById('emergency').value) || 0;
    const emSave = parseFloat(document.getElementById('emSave').value) || 0;
    const goal = parseFloat(document.getElementById('goal').value) || 0;
    const currentAge = parseFloat(document.getElementById('age').value) || 0;

    // Calculations
    const monthlySaving = salary - expense - emSave;
    const savingPercent = salary > 0 ? ((monthlySaving / salary) * 100).toFixed(1) : 0;
    
    // Goal Completion Time
    let monthsToGoal = "N/A";
    if (monthlySaving > 0 && goal > 0) {
        monthsToGoal = Math.ceil(goal / monthlySaving) + " Months";
    }

    // Retirement Estimate based on Savings Rate
    let retirementAge = "N/A";
    let suggestionText = "कृपया आफ्नो हिसाब हेर्न बायाँपट्टि विवरणहरू भर्नुहोस्।";

    if (salary > 0 && monthlySaving > 0) {
        const savingsRate = monthlySaving / salary;
        let yearsToRetire = 0;
        
        if (savingsRate >= 0.7) yearsToRetire = 5;
        else if (savingsRate >= 0.5) yearsToRetire = 15;
        else if (savingsRate >= 0.3) yearsToRetire = 25;
        else if (savingsRate >= 0.15) yearsToRetire = 35;
        else yearsToRetire = 45;

        if (currentAge > 0) {
            retirementAge = Math.min(currentAge + yearsToRetire, 70) + " Years Old";
            suggestionText = `तपाईंको बचत दर ${savingPercent}% छ। यसै गतिमा बचत र लगानी गरेमा तपाईं अनुमानित ${retirementAge} को उमेरमा रिटायर हुन सक्नुहुन्छ!`;
            if (savingPercent < 20) {
                suggestionText += " खर्च अलि घटाएर वा आम्दानी बढाएर बचत २०% भन्दा माथि पुर्‍याउने प्रयास गर्नुहोस्।";
            }
        }
    }

    // Display Results
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>📊 Your Financial Roadmap</h2>
        <div class="result-item"><span>Monthly Net Savings:</span> <span class="highlight">Rs. ${monthlySaving}</span></div>
        <div class="result-item"><span>Savings Rate:</span> <span class="highlight">${savingPercent}%</span></div>
        <div class="result-item"><span>Time to Reach Goal:</span> <span class="highlight">${monthsToGoal}</span></div>
        <div class="result-item"><span>Estimated Safe Retirement Age:</span> <span class="highlight">${retirementAge}</span></div>
        <div class="suggestion">💡 <strong>AI Suggestion:</strong> ${suggestionText}</div>
    `;

    // Render Chart
    renderChart(expense, monthlySaving, emSave);
}

function renderChart(expense, saving, emergency) {
    const ctx = document.getElementById('chart').getContext('2d');
    
    if (myChart) {
        myChart.destroy();
    }

    if (expense === 0 && saving === 0 && emergency === 0) return;

    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Expenses', 'Savings', 'Emergency Fund'],
            datasets: [{
                data: [expense, saving > 0 ? saving : 0, emergency],
                backgroundColor: ['#ef4444', '#10b981', '#3b82f6'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#f8fafc' }
                }
            }
        }
    });
}
