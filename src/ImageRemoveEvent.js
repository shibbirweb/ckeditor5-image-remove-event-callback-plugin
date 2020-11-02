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

        model.document.on('change:data', () => {
            const differ = model.document.differ

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

            changes.forEach(change => {
                if (change && change.type === 'remove' && change.name === 'image') {
                    hasNoImageRemoved = false
                }
            })

            if (hasNoImageRemoved) {
                return;
            }

            const removedImagesChanges = changes.filter(change => {
                return (change.type === 'insert' && change.name === 'image')
            })

            const removedImagesSrc = [];
            const removedImagesNode = [];

            removedImagesChanges.forEach(change => {
                // Root Element
                const root = change.position.root
                // Removed node
                const removedImageNode = root.getChild(0)
                // Removed image src
                const removedImageSrc = removedImageNode.getAttribute('src')
                // add into nodes
                removedImagesNode.push(removedImageNode)
                // add into srcs
                removedImagesSrc.push(removedImageSrc)
            })

            // Call the callback
            return callback(removedImagesSrc, removedImagesNode)
        })
    }
}
