var dir = require('node-dir');
const fs = require('fs');

var directory="essays";

dir.subdirs(directory, function(err, subdirs) {
    if (err) throw err;
    
    for (let i = 0; i < subdirs.length; i++) {
        console.log(subdirs[i]);
        var subdir =subdirs[i].substring(directory.length +1);
        const pattern= new RegExp('([a-z]+) - '+subdir);

        
        const files = fs.readdirSync(subdirs[i])
        for (const file of files) {
            console.log(file);
            console.log(pattern.test(file));
          //  try {
            if(pattern.test(file)==false){throw new Error('File name does not match criteria.');}
       // } catch (e) {console.error(e);}
        }
    }
});



