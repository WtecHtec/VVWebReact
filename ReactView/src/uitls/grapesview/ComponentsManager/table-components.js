export default function (domComponents) {
    domComponents.addType('layout-table', {
      
        // isComponent: el => {
        //     console.log('isComponent: 构建')
        // },
    model: {
        //       // Default properties
       defaults: {
        tagName: 'table',
        editable: true,
        resizable: true,
        Cols:5,
        Rows:5,
        traits: [
            'id','title',
            {
                    type: 'number',
                    lable: 'Cols',
                    name: 'Cols',
                    placeholder: '2-100',
                    min: 1, // Minimum number value
                    max: 100, // Maximum number value
                    changeProp: 1,  // 设置不出现在 标签的 属性上 
            },
            {
                type: 'number',
                lable: 'Rows',
                name: 'Rows',
                placeholder: '1-100',
                min: 2, // Minimum number value
                max: 100, // Maximum number value
                changeProp: 1,
        }
                     
        ],
        
        components: model => {
            // console.log('构建 components' ,model)
            const { Cols , Rows} = model.props();
         
                return model.getTableCom(Cols, Rows);
            }
       },
      
    
    init() {
        // console.log('初始化')
       
        // Listen to any attribute change
        this.on('change:Cols', this.handleAttrColsChange);
      
        this.on('change:Rows', this.handleRowsChange);
      },

  

  
      handleAttrColsChange() {
        
        const { Rows,Cols } = this.props()
        console.log('handleAttrColsChange',this.getTableCom(Cols,Rows))
        this.components()
        
       
      },
  
      handleRowsChange() {
        const { Rows,Cols } = this.props();
        this.components(this.getTableCom(Cols,Rows))
        
      },

      // 配置表格
      getTableCom(cols, rows) {
        let theads = ' <thead> <tr>'
        for (let i = 0; i < cols; i++ ) {
            theads += `<th scope="col"><div> ${i} </div> </th>`
        }
        theads += '</tr> </thead>'

        
        let  tbodys ='<tbody> '  

        for (let i = 1; i < rows; i++ ) {
             tbodys += '<tr>'
             for (let j = 0; j < cols; j++ ) {
                tbodys += `<td scope="col"><div> ${j} </div> </td>`
             }
            tbodys += '</tr>'  
        }
        tbodys  +=' </tbody>' 
   
        return ` <table class="table">${theads} ${tbodys}  </table>`
       

      }

    },

});


}