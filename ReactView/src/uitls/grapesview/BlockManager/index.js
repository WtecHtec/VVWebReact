import BasicBlock from './BasicBlock'
import LayoutBlock from './layout-block'
const BlockManager = function(editor) {
    var blockManager = editor.BlockManager;

        // 'my-first-block' is the ID of the block
    BasicBlock(blockManager)
    LayoutBlock(blockManager)

        
}

export default  BlockManager