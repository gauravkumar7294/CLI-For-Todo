const fs=require("fs");
const {Command}=require('commander');
const program=new Command();


   program
      .name('counter')
      .description('CLI that lets a user to Add ,Delete, Mark a todo as done')
      .version('0.8.0');

   program.command('count')
   .description('Count the number of lines in a file ')
   .argument('<file>','file to count')
   .action((file)=>{
    fs.readFile(file,'utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            const lines=data.split('\n').length;
            console.log(`There are ${lines} lines in ${file}`);
        }
    });
   });

   program.parse();