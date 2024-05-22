const result = 67;

if (result < 33) {
    console.log('Failed');
}
else if (result >= 33 && result < 40) {
    console.log('You got D grade');
}
else if (result >= 40 && result < 50) {
    console.log('You got C grade');
}
else if (result >= 50 && result < 60) {
    console.log('You got B grade');
}
else if (result >= 60 && result < 70) {
    console.log('You got A- grade');
}
else if (result >= 70 && result < 80) {
    console.log('You got A grade');
}
else if (result >= 80) {
    console.log('You got A+ grade');
}
else { 
    console.log('Invalid value');
}