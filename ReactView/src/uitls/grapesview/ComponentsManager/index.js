
import  basicComponents from './basic-components'

const DomComponents = function(editor) {
 
    const domComponents = editor.DomComponents;

    basicComponents(domComponents)

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

