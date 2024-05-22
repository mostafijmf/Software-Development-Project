const numbers = [1, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9, 10];

// Task 7
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === numbers[i + 1])
        continue
    console.log(numbers[i]);
}

// Task 8
let largeNum = numbers[0]
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > largeNum) largeNum = numbers[i];
}
console.log(largeNum);