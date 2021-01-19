export default  function (blockManager){
        



 

    blockManager.add('basic-video-block', {
        label: 'Video',
        content: {type: 'video' },
        category: 'Basic', // 归类 
    });

    blockManager.add('basic-row-block', {
        label: 'Row',
        content: {type: 'row' },
        category: 'Basic', // 归类 
    });

    blockManager.add('basic-table-block', {
        label: 'Table',
        content: {type: 'table' },
        category: 'Basic', // 归类 
    });

    blockManager.add('basic-text-block', {
        label: 'Text',
        content: {type: 'text' },
        category: 'Basic', // 归类 
    });

    blockManager.add('basic-my-block', {
        label: 'INPUT',
        content: {type: 'my-input-type' },
        category: 'Basic', // 归类 
    });

    blockManager.add('basic-my-div-type-block', {
        label: 'DIV',
        content: {type: 'DIV' },
        category: 'Basic', // 归类 
    });

    
}