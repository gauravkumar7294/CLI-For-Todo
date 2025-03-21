const fs=require("fs");
const {Command}=require('commander');
const program=new Command();
const Todo_file="todos.json";


function readTodos(){
    if(!fs.existsSync(Todo_file)){
        return [];
    }
    const data=fs.readFileSync(Todo_file,"utf-8");
    return JSON.parse(data);
}

function writeTodos(todos){
    fs.writeFileSync(Todo_file,JSON.stringify(todos,null,2));
}


 program
      .name('Todo CLI')
      .description('CLI that lets a user to Add ,Delete, Mark a todo as done')
      .version('0.8.0');

   program.command('create <task>')
   .description('Create New Todo')
   .action((task)=>{
    const todos=readTodos();
    todos.push({task,done:false});
    writeTodos(todos);
    console.log(`Todo added: "${task}"`);
   });

   program
   .command("list")
   .description("List all Todos")
   .action(()=>{
    const todos=readTodos();
    if(todos.length===0)
    {
        console.log("No todos found");
    }else{
        todos.forEach((todo,index)=>{
            console.log(`${index+1}.[${todos.done?"x":" "}]${todo.task}`);
        });
    }
   });


   program
   .command("done <index>")
   .description("Mark a todo as done")
   .action((index)=>{
    const todos=readTodos();
    if(index<1 || index>todos.length){
        console.log("Invalid todo index.");
        return;
    }
    todos[index-1].done=true;
    writeTodos(todos);
    console.log(`Todo marked as done:"${todos[index-1].task}"`);
   });


   program
      .command("delete <index>")
      .description("Delete a todo")
      .action((index)=>{
        const todos=readTodos();
        if(index<1||index>todos.length){
            console.log("Invalid todo Index value. ");
            return;
        }
        const removed=todos.splice(index-1,1);
        writeTodos(todos);
        console.log(`Todo deleted:"${removed[0].task}"`);
      });

   program.parse();