const BlockManager = function(editor) {
    var blockManager = editor.BlockManager;

        // 'my-first-block' is the ID of the block
        blockManager.add('my-first-block', {
            label: '<div class="my-block" style="color: red" > a标签  </div> ',
            content: '<a class="my-block">a标签</a>',
        });

        blockManager.add('the-row-block', {
            label: '2 Columns',
            content: '<div class="row" data-gjs-droppable=".row-cell" data-gjs-custom-name="Row">' +
                '<div class="row-cell" data-gjs-draggable=".row"></div>' +
                '<div class="row-cell" data-gjs-draggable=".row"></div>' +
              '</div>',
          });
          blockManager.add('h1-block', {
            label: 'Heading',
            content: '<h1>Put your title here</h1>',
            category: 'Basic', // 归类 
            attributes: {
              title: 'Insert h1 block'
            }
          });
}

export default  BlockManager