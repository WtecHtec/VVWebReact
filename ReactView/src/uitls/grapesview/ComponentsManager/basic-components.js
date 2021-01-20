export default function(domComponents){

    // domComponents.addType('diy-div', {
    //     // Make the editor understand when to bind `my-input-type`
    //     // isComponent: el => el.tagName === 'text',
        
    //     model: {
    //         //       // Default properties
    //        defaults: {
    //         tagName: 'div',
    //         editable: true,
    //         resizable: true,
    //         someNewProp: 'Hello',
    //         // traits: [
    //         //     {
    //         //         type: 'text', // If you don't specify the type, the `text` is the default one
    //         //         // name: 'my-trait', // Required and available for all traits
    //         //         label: 'My trait', // The label you will see near the input
    //         //         // label: false, // If you set label to `false`, the label column will be removed
    //         //         placeholder: 'Insert text', // Placeholder to show inside the input
    //         //       }
                
    //         // ],
    //         // content: '这是一个空DIV',
    //         components: model => {
    //             console.log( model.getAttributes())
    //             console.log(model.getTrait('content') )
    //             return `  这是一个空DIV  `;
    //             }
    //        },
          
        
    //     init() {
    //         this.on('change:someprop', this.handlePropChange);
    //         // Listen to any attribute change
    //         this.on('change:attributes:content', this.handleAttrChange);
    //         // Listen to title attribute change
    //         this.on('change:attributes:title', this.handleTitleChange);
    //       },
      
    //       handlePropChange() {
    //         const { someprop } = this.props();
         
    //         console.log('New value of someprop: ', someprop);
    //       },
      
    //       handleAttrChange() {
            
    //         // this.setAttributes({content: this.getAttributes().content})
            
           
    //       },
      
    //       handleTitleChange() {
    //         console.log('Attribute title updated: ', this.getAttributes().title);
    //         console.log('Attributes content  updated: ',  this.getEl() );
    //         console.log(this)
    //         this.updated()
    //       },
    //     },

    // });


    domComponents.addType('text', {
        model: {
           defaults: {
                editable: true,
                resizable: true,
            }
       }
    });
}
