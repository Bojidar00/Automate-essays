var node_dir = require('node-dir');
const fs = require('fs');
const validator = require('html-validator');
const markdownlint = require("markdownlint");

var directory="essays";

node_dir.subdirs(directory, function(err, sub_dirs) {
    if (err) throw err;
    
    for (let i = 0; i < sub_dirs.length; i++) {
        console.log(sub_dirs[i]);
        var sub_dir =sub_dirs[i].substring(directory.length +1);
        const pattern= new RegExp('([a-z]+) - '+sub_dir);
        const html_pattern= new RegExp('([a-z]+).html');
        const md_pattern= new RegExp('([a-z]+).md');

        
        const files = fs.readdirSync(sub_dirs[i])
        for (const file of files) {
            console.log(file);
            console.log(pattern.test(file));
            if(pattern.test(file)==false){throw new Error('File name does not match criteria.');}
            if(html_pattern.test(file)==true){check_html(sub_dir+"/"+file);}
            if(md_pattern.test(file)==true){check_md(sub_dir+"/"+file);}
        }
    }
});



async function check_html  (html_file_directory) {
    
    const options = {
      validator: 'WHATWG',
      format: 'text',
      data: fs.readFileSync(directory+"/"+html_file_directory, 'utf8')
    }
    
    try {
      const result = await validator(options)
      console.log(result);
      if(result.isValid==false){Promise.reject(new Error('HTML file "'+html_file_directory+'" not valid.'));}
    } catch (error) {
      console.error(error)
    }
    
  }

  async function check_md  (md_file_directory) {
    const options = {
        "files": [ directory+"/"+md_file_directory ]
      };
      
      markdownlint(options, function callback(err, result) {
        if (!err) {
          console.log(result.toString());
        }
        if(result.toString()==''){console.log("md is valid");}
        else{throw new Error('MD file "'+md_file_directory+'" is not valid.');}
      });

  }
  