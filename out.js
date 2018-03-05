
const figlet = require('figlet');
const chalk = require('chalk');

//Colorear
const colorize =(msg,color) => {
    if (typeof color !== "undefined"){
        msg = chalk[color].bold(msg);
    }
    return msg;
};
//Log color

const log =(msg,color)=>{
    console.log(colorize(msg,color));
};

//Mensaje log grnade

const biglog  =(msg, color)=>{
    log(figlet.textSync(msg,{forizontalLayout:'full'}),color);
};

//Mensaje error

const errorlog =(emsg)=>{
    console.log(`${colorize("Error","red")}: ${colorize(colorize(emsg,"red"),"bgYellowBright")}`);
};

exports=module.exports={
    colorize,
    log,
    biglog,
    errorlog
};
1