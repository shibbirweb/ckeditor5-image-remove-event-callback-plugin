# CKEditor 5 Image Remove Event Callback Plugin

Handle image remove event callback from CKEditor 5

### Usage:

Install package

```
npm install ckeditor5-image-remove-event-callback-plugin
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
        callback: (imagesSrc, nodeObjects) => {
            // note: imagesSrc is array of src & nodeObjects is array of nodeObject
            // node object api: https://ckeditor.com/docs/ckeditor5/latest/api/module_engine_model_node-Node.html

            console.log('callback called', imagesSrc, nodeObjects)
        }
    },
    // ...
});
```

