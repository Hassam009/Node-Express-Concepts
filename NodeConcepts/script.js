const fs=require('fs');

// fs.writeFile('Newfile.txt', 'I am writing data', function(err){
//     if (err) console.error(err);
//     else console.log ('done');
// })

fs.rename('Newfile.txt', 'New2.txt', function(err){
    if (err) console.error(err);
    else console.log ('done');
})

fs.copyFile('New2.txt', '../copy/copyfile.txt', function(err){
    if (err) console.error(err);
    else console.log ('done');
    
})
fs.copyFile('New2.txt', '../copy/copyfile2.txt', function(err){
    if (err) console.error(err);
    else console.log ('done');
})

// fs.unlink('../copy/copyfile.text', function(err){
//     if (err) console.error(err);
//     else console.log ('done');
// })

fs.readFile('New2.txt', 'utf8', function(err,data){
    if(err) console.error(err);
    else console.log(data)
})
fs.readdir('../copy',function(err,files){
    if(err) console.error(err);
    else console.log(files)
})