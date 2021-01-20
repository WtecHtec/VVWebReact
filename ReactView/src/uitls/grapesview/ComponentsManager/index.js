
import  basicComponents from './basic-components'

import  layoutComponents from './layout-components'
import  tableComponents from './table-components'
import  progressComponents from './progress-components'

const DomComponents = function(editor) {
 
    const domComponents = editor.DomComponents;

    basicComponents(domComponents)

    layoutComponents(domComponents)

    tableComponents(domComponents)

    progressComponents(domComponents)
    

    // editor.DomComponents.addType('my-input-type', {
    //     // Make the editor understand when to bind `my-input-type`
    //     isComponent: el => el.tagName === 'INPUT',
      
    //     // Model definition
    //     model: {
    //       // Default properties
    //       defaults: {
    //         tagName: 'input',
    //         attributes: { // Default attributes
    //           type: 'text',
    //           name: 'default-name',
    //           placeholder: 'Insert text here',
    //         },
    //         traits: [
    //           'name',
    //           'placeholder',
    //           { type: 'checkbox', name: 'required' },
    //         ],
    //       }
    //     }
    //   });



        
}

export default  DomComponents

