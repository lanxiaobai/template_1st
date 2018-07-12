// 本次使用art template模板引擎来填充数据
let http =require('http');
let fs=require('fs');
let path=require('path');
let mime=require('mime');
let template=require('art-template');
let rootpath=path.join(__dirname,'www');
http.createServer((request,response)=>{
  // 文件的路径
  let filePath = path.join(rootpath,request.url);
  // 直接判断是不是首页
  if(filePath.indexOf('index.html')!=-1){
    // 读取json文件
      fs.readFile(path.join(__dirname,'data/foodList.json'),'utf-8',(err,data)=>{
        if(!err){
          let result= JSON.parse(data);
          var html=template(__dirname+'/www/index.html',{
            result
          });
          response.end(html);
        }
      })
  }else{
    fs.readFile(filePath,(err,data)=>{
      if(err){
        console.log(err);
      }else{
        response.writeHead(200,{
          'content-type':mime.getType(filePath)
        });
        response.end(data);
      }
    })
  }
}).listen(80,'127.0.0.1',()=>{
  console.log('开启监听成功~');
  
})
