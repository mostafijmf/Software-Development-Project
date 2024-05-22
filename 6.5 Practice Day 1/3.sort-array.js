let arr = [1, 14, 2, 9, 12, 10, 6, 20, 19, 11, 3, 7, 8, 13, 15, 4, 5, 18, 16, 17];

for (let i = 0; i < arr.length; i++) {
    for (let j = arr.length; j > i; j--) {
        if (arr[i] > arr[j]) {
            let a = arr[i];
            arr[i] = arr[j];
            arr[j] = a;
        }
    }
}
console.log(arr);