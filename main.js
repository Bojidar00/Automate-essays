var nodeDir = require('node-dir');
const fs = require('fs');
const validator = require('html-validator');
const markdownLint = require("markdownlint");




var directory="essays";

nodeDir.subdirs(directory, function(err, subDirs) {
    if (err) throw err;
    
    for (let i = 0; i < subDirs.length; i++) {
        console.log(subDirs[i]);
        var subDir =subDirs[i].substring(directory.length +1);
        const pattern= new RegExp('([a-z]+) - '+subDir);
        const htmlPattern= new RegExp('([a-z]+).html');
        const mdPattern= new RegExp('([a-z]+).md');

        
        const files = fs.readdirSync(subDirs[i])
        for (const file of files) {
            console.log(file);
            console.log(pattern.test(file));
            if(pattern.test(file)==false){throw new Error('File name does not match criteria.');}
            if(htmlPattern.test(file)==true){checkHtml(subDir+"/"+file);}
            if(mdPattern.test(file)==true){checkMd(subDir+"/"+file);}
        }
    }
});



async function checkHtml  (htmlFileDirectory) {
    
    const options = {
      validator: 'WHATWG',
      format: 'text',
      data: fs.readFileSync(directory+"/"+htmlFileDirectory, 'utf8')
    }
    
    try {
      const result = await validator(options)
      console.log(result);
      if(result.isValid==false){Promise.reject(new Error('HTML file "'+htmlFileDirectory+'" not valid.'));}
    } catch (error) {
      console.error(error)
    }
    
  }

  async function checkMd  (mdFileDirectory) {
    const options = {
        "files": [ directory+"/"+mdFileDirectory ]
      };
      
      markdownLint(options, function callback(err, result) {
        if (!err) {
          console.log(result.toString());
        }
        if(result.toString()==''){console.log("md is valid");}
        else{throw new Error('MD file "'+mdFileDirectory+'" is not valid.');}
      });

  }
  