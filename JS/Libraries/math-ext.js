//Math Extensions Library

Math.randomInt =function (low,high){
    return(Math.floor(Math.random() * (high - low) + low));
}

Math.randomDec = function (low, high){
    return(Math.random() * (high - low) + low);
}
