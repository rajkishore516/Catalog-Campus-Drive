const fs = require('fs');
const path = require('path');

// Function to convert a number from a given base to decimal
function baseToDecimal(value, base) {
    return parseInt(value, base);
}

// Function to perform Lagrange interpolation
function lagrangeInterpolation(points, k) {
    let f0 = 0;

    for (let j = 0; j < k; j++) {
        let product = 1;
        const xj = points[j][0];
        const yj = points[j][1];

        for (let i = 0; i < k; i++) {
            if (i !== j) {
                const xi = points[i][0];
                product *= (0 - xi) / (xj - xi);
            }
        }
        f0 += yj * product;
    }

    return f0;
}

// Function to find the constant term from the JSON data
function findConstantTerm(inputJson) {
    const data = JSON.parse(inputJson);
    const n = data.keys.n;
    const k = data.keys.k;

    const points = [];

    for (let i = 1; i <= n; i++) {
        const key = data[i.toString()];
        if (key) {
            const base = parseInt(key.base, 10);
            const value = baseToDecimal(key.value, base);
            points.push([i, value]);
        }
    }

    const constantTerm = lagrangeInterpolation(points, k);
    return Math.round(constantTerm);
}

// Path to the JSON data file
const inputJsonPath = 'D:\\catalog\\testcase1.json';

// Read the JSON data from the file
fs.readFile(inputJsonPath, 'utf8', (err, inputJson) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }
    
    const constantTerm = findConstantTerm(inputJson);
    console.log("Constant term (f(0)):", constantTerm);
});
