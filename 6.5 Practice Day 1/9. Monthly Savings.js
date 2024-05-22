const monthlySavings = (payments, cost) => {
    if (!Array.isArray(payments) || typeof cost !== 'number')
        return 'Invalid input';

    let sum = 0;

    for (let i = 0; i < payments.length; i++) {
        if (payments[i] >= 3000) {
            const tax = (payments[i] / 100) * 20;
            sum += payments[i] - tax;
        }
        else sum += payments[i];
    }

    const savings = sum - cost;
    if (savings < 0) return "earn more";
    else return savings;
};

console.log(monthlySavings([900, 2700, 3400], 1000))