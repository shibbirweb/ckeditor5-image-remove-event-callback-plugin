[![npm](https://img.shields.io/npm/v/ckeditor5-image-remove-event-callback-plugin.svg)](https://www.npmjs.com/package/ckeditor5-image-remove-event-callback-plugin) [![Downloads](https://img.shields.io/npm/dt/ckeditor5-image-remove-event-callback-plugin.svg)](https://www.npmjs.com/package/ckeditor5-image-remove-event-callback-plugin)

# CKEditor 5 Image Remove Event Callback Plugin

Handle image remove event callback from CKEditor 5

### Usage:

Install package

```
npm install ckeditor5-image-remove-event-callback-plugin -D
```


Use in Build

```js
// app.js
// ...
import ImageRemoveEventCallbackPlugin from 'ckeditor5-image-remove-event-callback-plugin'; // Add this
// ...

ClassicEditor.builtinPlugins = [
    // ...
    ImageRemoveEventCallbackPlugin
    // ...

]
```
Use in CKEditor 5 initialization
```js
ClassicEditor.create(document.querySelector('#editor'), {
    //... 
    imageRemoveEvent: {
        additionalElementTypes: null, // Add additional element types to invoke callback events. Default is null and it's not required. Already included ['image','imageBlock','inlineImage']
        // additionalElementTypes: ['image', 'imageBlock', 'inlineImage'], // Demo to write additional element types
        callback: (imagesSrc, nodeObjects) => {
            // note: imagesSrc is array of src & nodeObjects is array of nodeObject
            // node object api: https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_node-Node.html

            console.log('callback called', imagesSrc, nodeObjects)
        }
    },
    // ...
});
```

Note: There is a demo project for using this plugin in demo folder.

NB: If you want to contribute on this project, you are always welcome. 
