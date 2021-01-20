export default function(domComponents){

    domComponents.addType('layout-row', {
        // You can update the isComponent logic or leave the one from `some-component`
        isComponent: (el) => false,
      
        // Update the model, if you need
        model: {
          // The `defaults` property is handled differently
          // and will be merged with the old `defaults`
          defaults: {
            resizable: true,
            tagName: 'div', // Overrides the old one
            classes:['row'],
            components: model => {
                return `  <div class="col">
                1 of 2
              </div>
              <div class="col">
                2 of 2
              </div>`;
            }

          
          },
         
        },
      });


      domComponents.addType('layout-col', {
        // You can update the isComponent logic or leave the one from `some-component`
        isComponent: (el) => false,
      
        // Update the model, if you need
        model: {
          // The `defaults` property is handled differently
          // and will be merged with the old `defaults`
          defaults: {
            resizable: true,
            tagName: 'div', // Overrides the old one
            classes:['col'],
            components: model => {
                return `<div>  col  </div>  `;
            }

          },
         
        },
      });



      domComponents.addType('layout-card', {
        // You can update the isComponent logic or leave the one from `some-component`
        isComponent: (el) => false,
      
        // Update the model, if you need
        model: {
          // The `defaults` property is handled differently
          // and will be merged with the old `defaults`
          defaults: {
            resizable: true,
            tagName: 'div', // Overrides the old one
            components: model => {
                return ` 
                <div class="card" style="width: 18rem;">
                            <img  src="https://user-gold-cdn.xitu.io/2020/4/16/171822f2a2cf35f7?imageView2/1/w/90/h/90/q/85/format/webp/interlace/1" alt="暂无照片" class="card-img-top">
                            <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                </div>
               `;
            }

          
          },
         
        },
      });

      


       

    
}