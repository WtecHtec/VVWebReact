export default  function (blockManager){

    blockManager.add('component-layout-row-block', {
        label: 'Row',
        content: {type: 'layout-row' },
        category: 'Layout', // 归类 
    });


    blockManager.add('component-layout-col-block', {
        label: 'Col',
        content: {type: 'layout-col' },
        category: 'Layout', // 归类 
    });
    
    blockManager.add('component-layout-table-block', {
        label: 'Table',
        content: {type: 'layout-table' },
        category: 'Layout', // 归类 
    });

    blockManager.add('component-layout-card-block', {
        label: 'Card',
        content: {type: 'layout-card' },
        category: 'Layout', // 归类 
    });



   
    

  

}