const  {log, biglog, errorlog, colorize}=require("./out");
const model=require('./model');

   exports.helpCmd = rl =>{
    console.log('Comandos:');
    console.log('h|help - Mustra esta ayuda.');
    console.log('list - Listar los quizzes existentes.');
    console.log('show <id> - Muestr la pregunta y la respuesta de la quiz indicado.');
    console.log('add - Añadir un nuevo quiz interactivamente.');
    console.log('delete <id> - Borrar el quiz indicado.');
    console.log('edit <id> - Editar el quiz indicado.');
    console.log('test <id> - Probar el quiz indicado.');
    console.log('p|play - Jugar a preguntar aleatoriamente todos los quizzes.');
    console.log('credits - Créditos.');
    console.log('q|quit - Salir del programa.');
    rl.prompt();
};

exports.addCmd= rl =>{
    rl.question(colorize('Introduzca una pregunta: ','red'),question=>{
        rl.question(colorize('Intorduzca la respuesta: ', 'red'),answer=>{
            model.add(question,answer);
            log(`${colorize('Se ha añadido', 'magenta')}: ${question} ${colorize('=>','magenta')} ${answer}`);
            rl.prompt();
         });
    });
};
exports.listCmd=rl=>{
    model.getAll().forEach((quiz,id)=>{
        log(`[${colorize(id,'magenta')}]: ${quiz.question}`);

    });
    rl.prompt();
};
exports.showCmd= (rl,id) =>{
    if(typeof id === "undefined"){
        errorlog(`Falta el parámetro id.`);
    }else {
        try{
            const quiz = model.getByIndex(id);
            log(`[${colorize(id,'magenta')}]: ${quiz.question} ${colorize('=>','magenta')} ${quiz.answer}`);
        } catch(error){
            errorlog(error.message);
        }
    }


    rl.prompt();
};
exports.testCmd= (rl,id) =>{
    if(typeof id==="undefined"){
        errorlog(`Falta el parámetro id.`);
        rl.prompt();
    }else {
        try{
            const quiz = model.getByIndex(id);
            rl.question(colorize(quiz.question+'?','red'),answer => {

            if((answer.trim()).toLowerCase()===quiz.answer.toLowerCase()){
                biglog("Correcto","green");
                rl.prompt();
            }else{
                biglog("Incorrecto","red");
                rl.prompt();
            }

        });
    }catch(error){
            errorlog(error.message);
            rl.prompt();
        };

};
};
exports.playCmd=rl=>{
    let score=0;
    toBeResolve=[];
    quizzes=model.getAll();
    for(let i=0;i<quizzes.length;i++){
        toBeResolve.push(i);
    }

    const playOne=()=>{


    if(toBeResolve.length===0){
        log("No hay nada más que preguntar.\nFin del examen. Aciertos:");
        rl.prompt();
    }else{
        let id=Math.floor(Math.random());
        let quiz=quizzes[id];
        rl.question(colorize(quiz.question+'?','red'),answer => {

            if((answer.trim()).toLowerCase()===quiz.answer.toLowerCase()){
                score++;
            log(`CORRECTO - Lleva ${score} aciertos.`);
            toBeResolve.splice(id, 1);
            quizzes.splice(id, 1);
            playOne();


        }else{
            log(`Incorrecto.\nFin del juego. Aciertos: ${score}`);
            biglog(score,"magenta");
            rl.prompt();
        }

    });
    }

    }
    playOne();
};
exports.deleteCmd= (rl,id) =>{
    if(typeof id === "undefined"){
        errorlog(`Falta el parámetro id.`);
    }else {
        try{
            model.deleteByIndex(id);
        } catch(error){
            errorlog(error.message);
        }
    }
    rl.prompt();
};
exports.editCmd= (rl,id) =>{
    if(typeof id==="undefined"){
        errorlog(`Falta el parámetro id.`);
        rl.prompt();
    }else {
        try{
            const quiz = model.getByIndex(id);
            process.stdout.isTTY && setTimeout(()=>{rl.write(quiz.question),0});
            rl.question(colorize('Introduzca una pregunta: ','red'),question=>{
                process.stdout.isTTY && setTimeout(()=>{rl.write(quiz.answer),0});
                rl.question(colorize('Intorduzca la respuesta: ', 'red'),answer=>{
                    model.update(id,question,answer);
                    log(`Se ha cambiado el quiz ${colorize(id,'magenta')} por: ${question}${colorize('=>','magenta')} ${question,answer}`);
                    rl.prompt();
                });
            });
        }catch (error){
            errorlog(error.message);
            rl.prompt();
        }
    }
};
exports.creditsCmd=rl=>{
    console.log('Autores de la práctica: ');
    console.log('Lingfeng Zheng');
    rl.prompt();
};
exports.quitCmd=rl=>{
    rl.close();
};