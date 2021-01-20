export default  function (blockManager){
        



    blockManager.add('component-image-block', {
        label: 'Image',
        content: '<img src="https://user-gold-cdn.xitu.io/2020/4/16/171822f2a2cf35f7?imageView2/1/w/90/h/90/q/85/format/webp/interlace/1" alt="暂无照片"></img>',
        category: 'Components', // 归类 
    });

    blockManager.add('component-video-block', {
        label: 'Video',
        content: {type: 'video' },
        category: 'Components', // 归类 
    });


    blockManager.add('component-progress-block', {
        label: 'Progress',
        content: {type: 'progress-components' },
        category: 'Components', // 归类 
    });
    

    // blockManager.add('component-Badge-block', {
    //     label: 'Badge',
    //     content: '<span class="badge badge-secondary">New</span>',
    //     category: 'Components', // 归类 
    // });


    


  

    // blockManager.add('basic-DiyDiv-block', {
    //     label: 'DiyDiv',
    //     content: {type: 'diy-div' },
    //     category: 'Basic', // 归类 
    // });

    // blockManager.add('basic-row-block', {
    //     label: 'Row',
    //     content: {type: 'row' },
    //     category: 'Basic', // 归类 
    // });

    // blockManager.add('basic-table-block', {
    //     label: 'Table',
    //     content: {type: 'table' },
    //     category: 'Basic', // 归类 
    // });

    // blockManager.add('basic-text-block', {
    //     label: 'Text',
    //     content: {type: 'text' },
    //     category: 'Basic', // 归类 
    // });

    // blockManager.add('basic-my-block', {
    //     label: 'INPUT',
    //     content: {type: 'my-input-type' },
    //     category: 'Basic', // 归类 
    // });

    // blockManager.add('basic-my-div-type-block', {
    //     label: 'DIV',
    //     content: {type: 'DIV' },
    //     category: 'Basic', // 归类 
    // });

    
}