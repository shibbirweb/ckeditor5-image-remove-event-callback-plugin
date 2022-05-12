/**
 * @author MD. Shibbir Ahmed <shibbirweb@gmail.com> (http://shibbir.me/)
 *
 */
export default class ImageRemoveEvent {

    constructor(editor, configuration) {
        this.editor = editor
        this.configuration = configuration

        this.emitCallback()
    }

    emitCallback() {
        const {callback, additionalElementTypes} = this.configuration
        const editor = this.editor
        let model = editor.model

        const defaultElementTypes = [
            'image',
            'imageBlock',
            'inlineImage',
            'imageInline',
        ]

        let elementTypes = [
            ...defaultElementTypes,
        ]

        if (Array.isArray(additionalElementTypes)) {
            elementTypes = elementTypes.concat(additionalElementTypes)
        }

        model.document.on('change:data', (event) => {
            const differ = event.source.differ


            // if no difference
            if (differ.isEmpty) {
                return;
            }

            const changes = differ.getChanges({
                includeChangesInGraveyard: true
            });

            if (changes.length === 0) {
                return;
            }

            let hasNoImageRemoved = true

            // check any image remove or not
            for (let i = 0; i < changes.length; i++) {
                const change = changes[i]
                // if image remove exists
                if (change && change.type === 'remove' && elementTypes.includes(change.name)) {
                    hasNoImageRemoved = false
                    break
                }
            }

            // if not image remove stop execution
            if (hasNoImageRemoved) {
                return;
            }

            // get removed nodes
            const removedNodes = changes.filter(change => (change.type === 'insert' && elementTypes.includes(change.name)))

            // removed images src
            const removedImagesSrc = [];
            // removed image nodes
            const removedImageNodes = []

            removedNodes.forEach(node => {
                const removedNode = node.position.nodeAfter
                removedImageNodes.push(removedNode)
                removedImagesSrc.push(removedNode.getAttribute('src'))
            })

            // invoke the callback
            return callback(removedImagesSrc, removedImageNodes)
        })
    }
}
