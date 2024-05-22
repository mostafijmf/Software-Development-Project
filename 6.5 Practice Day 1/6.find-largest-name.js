const friends = ["fahim", "naim", "abdul", "sadsd", "heroAlom"];

let large = friends[0];
for (let i = 0; i < friends.length; i++) {
    if(friends[i].length > large.length){
        large = friends[i];
    }
}

console.log(large);