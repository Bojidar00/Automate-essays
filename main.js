var dir = require('node-dir');
const fs = require('fs');
const validator = require('html-validator');

var directory="essays";

dir.subdirs(directory, function(err, subdirs) {
    if (err) throw err;
    
    for (let i = 0; i < subdirs.length; i++) {
        console.log(subdirs[i]);
        var subdir =subdirs[i].substring(directory.length +1);
        const pattern= new RegExp('([a-z]+) - '+subdir);
        const html_pattern= new RegExp('([a-z]+).html');
        const md_pattern= new RegExp('([a-z]+).md');

        
        const files = fs.readdirSync(subdirs[i])
        for (const file of files) {
            console.log(file);
            console.log(pattern.test(file));
            if(pattern.test(file)==false){throw new Error('File name does not match criteria.');}
            if(html_pattern.test(file)==true){Check_html(subdir+"/"+file);}
            if(md_pattern.test(file)==true){}
        }
    }
});



async function Check_html  (html_file_directory) {
    
    const options = {
      validator: 'WHATWG',
      format: 'text',
      data: fs.readFileSync(directory+"/"+html_file_directory, 'utf8')
    }
    
    
      const result = await validator(options)
      console.log(result)
      if(result.isValid==false){throw new Error('HTML file "'+html_file_directory+'" not valid.');}
    
  }
  