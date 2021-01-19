export default  function (blockManager){

    // blockManager.add('basic-div-block', {
    //     label: ' DIV',
    //     content: '<div> 这是一个div  </div>',
    //     category: 'Basic', // 归类 
        
         
    //   });

    blockManager.add('basic-div-block', {
        label: ' Div',
        content: '<div> 这是一个div  </div>',
        category: 'Basic', // 归类 
         
      });



    blockManager.add('basic-a-block', {
        label: 'Link',
        content: '<a href="https://juejin.cn/user/2471357870245848">主页</a>',
        category: 'Basic', // 归类 
      });


    blockManager.add('basic-span-block', {
        label: 'Span',
        content: '<span>这是一个 span </span>',
        category: 'Basic', // 归类 
      
    });

    blockManager.add('basic-p-block', {
        label: 'P',
        content: '<p>段落</p>',
        category: 'Basic', // 归类 
    });

    blockManager.add('basic-h1-block', {
        label: 'H1',
        content: '<h1>标题h1</h1>',
        category: 'Basic', // 归类 
    });

    blockManager.add('basic-h2-block', {
        label: 'H2',
        content: '<h2>标题h2</h2>',
        category: 'Basic', // 归类 
    });

    blockManager.add('basic-h3-block', {
        label: 'H3',
        content: '<h3>标题h3</h3>',
        category: 'Basic', // 归类 
    });
  
    blockManager.add('basic-label-block', {
        label: 'Lable',
        content: '<lable>标题h3</lable>',
        category: 'Basic', // 归类 
    });


   

}