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
        const { callback } = this.configuration
        const editor = this.editor
        let model = editor.model

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
            for (let i = 0; i < changes.length; i++){
                const change = changes[i]
                // if image remove exists
                if (change && change.type === 'remove' && change.name === 'image') {
                    hasNoImageRemoved = false
                    break
                }
            }

            // if not image remove stop execution
            if (hasNoImageRemoved) {
                return;
            }

            // get removed nodes
            const removedNodes = changes.filter(change => (change.type === 'insert' && change.name === 'image'))

            // removed images src
            const removedImagesSrc = [];
            // removed image nodes
            const removedImageNodes = []

            removedNodes.forEach(node => {
                const removedNode = node.position.nodeAfter
                removedImageNodes.push(removedNode)
                removedImagesSrc.push(removedNode.getAttribute('src'))
            })

            // Call the callback
            return callback(removedImagesSrc, removedImageNodes)
        })
    }
}
