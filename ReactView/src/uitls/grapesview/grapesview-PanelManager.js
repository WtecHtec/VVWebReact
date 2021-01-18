
const PanelManager =  function(editor) {


    const panelManager = editor.Panels;
    var saveButton = panelManager.addButton('options',{
        id: 'saveButton',
        className: 'fa fa-save',
        command: 'someCommand',
        attributes: { title: 'Some title'},
    
   });


}

export default PanelManager