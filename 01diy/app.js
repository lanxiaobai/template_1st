/*
    静态资源服务器
        让电脑有类似于Apache的功能
        有一个www目录 把自己写好的静态网站 丢进去
        开启之后 用户 通过ip地址访问 
            有首页 返回 页面给用户
            如果没有首页 列表给用户
*/

// nodejs 要开启 http服务 导入模块 生成路径 读取文件(前端开发中 快速操纵dom ->jQ 快速生成轮播图 ->swiper 使用ui框架 ->bs)
let http = require('http');
let fs = require('fs');
let path = require('path');

// 导入mime
let mime = require('mime');
// mime.getType('txt');  mime 导入的第三方包 .getType 包里面的功能
// $.ajax()

// 网站根目录的 绝对路径
let rootPath = path.join(__dirname, 'www');

// 开启服务
http.createServer((request, response) => {
    let filepath=path.join(rootPath,request.url);
    if(filepath.indexOf("index.html")!=-1){    
        fs.readFile(path.join(__dirname, 'data/foodList.json'), 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                //转化为js对象
                let result = JSON.parse(data);
                console.log(result.length);
                //生成li标签
                let temp = '';
                for (let i = 0; i < result.length; i++) {
                    temp += `
                        <li>
                            <a href="#">
                                <div class="left">
                                    <img src="${result[i].path}"
                                        alt="">
                                </div>
                                <div class="right">
                                    <p class="title">${result[i].foodName}</p>
                                    <p class="material">
                                    ${result[i].material}
                                    </p>
                                    <p class="stats">
                                    ${result[i].stats}
                                    </p>
                                    <p class="author">
                                        <span href="/cook/10694168/" class="gray-font">${result[i].author}</span>
                                    </p>
                                </div>
                            </a>
                        </li>
                        `;
                }
                // 读取html页面，作为模板页面
                let temHtml = fs.readFileSync(path.join(rootPath,'index.html'),'utf-8');
                temHtml1 = temHtml.replace('${ahole}',temp);
                response.end(temHtml1)
    
            }
        })
    }else{
        fs.readFile(filepath,(err,data)=>{
            response.writeHead(200,{
                'content-type':mime.getType(filepath)
            });
           
            if(err){
                console.log(err);
            }else{
                response.end(data);
            }
        })
    }


}).listen(80, '127.0.0.1', () => {
    console.log('listen to 127.0.0.1:80 success');
})

// fs.readFile(path.join(__dirname,'data/foodList.json'),'utf-8',(err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         // console.log(data);
//         // 转化为js对象 或者是数组
//         let result =  JSON.parse(data);
//         // console.log(result);
//         // console.log( typeof result);
//         // console.log(  result.length);
//         // 生成li标签
//         let tem = '';
//         for(let i =0;i<result.length;i++){
//             // 生成li 拼接到 tem中
//             tem+=`
//             <li>
//             <a href="#">
//                 <div class="left">
//                     <img src="${result[i].path}"
//                         alt="">
//                 </div>
//                 <div class="right">
//                     <p class="title">${result[i].foodName}</p>
//                     <p class="material">
//                     ${result[i].material}
//                     </p>
//                     <p class="stats">
//                     ${result[i].stats}
//                     </p>
//                     <p class="author">
//                         <span href="/cook/10694168/" class="gray-font">${result[i].author}</span>
//                     </p>
//                 </div>
//             </a>
//         </li>`;
//         }
//         // console.log(tem);
//         // 读取index.html 作为模板页面
//         let temHtml = fs.readFileSync(path.join(rootPath,'index.html'),'utf-8');
//         // 替换字符串中的某些文本
//         temHtml = temHtml.replace('${aDeepHole}',tem);
//         // console.log(temHtml);
//         response.end(temHtml)
//     }
// })