export default function(domComponents){

    domComponents.addType('DIV', {
        // Make the editor understand when to bind `my-input-type`
        isComponent: el => el.tagName === 'DIV',
    });

    domComponents.addType('SPAN', {
    // Make the editor understand when to bind `my-input-type`
    isComponent: el => el.tagName === 'SPAN',
    });

    domComponents.addType('P', {
    // Make the editor understand when to bind `my-input-type`
    isComponent: el => el.tagName === 'P',
    });

    domComponents.addType('H1', {
    // Make the editor understand when to bind `my-input-type`
    isComponent: el => el.tagName === 'H1',
    });

    domComponents.addType('H2', {
    // Make the editor understand when to bind `my-input-type`
    isComponent: el => el.tagName === 'H2',
    });

    domComponents.addType('H3', {
    // Make the editor understand when to bind `my-input-type`
    isComponent: el => el.tagName === 'H3',
    });

}
