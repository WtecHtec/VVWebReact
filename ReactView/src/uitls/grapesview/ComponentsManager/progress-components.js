export default function (domComponents) {
    domComponents.addType('progress-components', {
      
        // isComponent: el => {
        //     console.log('isComponent: 构建')
        // },
    model: {
        //       // Default properties
       defaults: {
        tagName: 'div',
        editable: true,
        resizable: true,
        classes:['progress'],
        AriaValue:25,
        traits: [
            {
                    type: 'number',
                    lable: 'AriaValue',
                    name: 'AriaValue',
                    placeholder: '0-100',
                    min: 1, // Minimum number value
                    max: 100, // Maximum number value
                    changeProp: 1,
                  
            }
                     
        ],
        
        components: model => {
     
         
            return `
                <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
             `;
            }
       },
      
    
    init() {
        // console.log('初始化')
       
        // Listen to any attribute change
        this.on('change:AriaValue', this.handleAriaValueChange);
      
      
      },

  

  
      handleAriaValueChange() {
      
        let { AriaValue } = this.props()
        let pdom = `
        <div class="progress-bar" role="progressbar" style="width: ${AriaValue}%;" aria-valuenow=" ${AriaValue}" aria-valuemin="0" aria-valuemax="100"> ${AriaValue}%</div>
     `
        this.components(pdom)
       
      },
  
  

     

    },

});


}