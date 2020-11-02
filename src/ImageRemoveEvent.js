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

            if (!changes || !changes[1]) {
                return;
            }

            const lastChange = changes[1]

            if (lastChange && (lastChange.name && lastChange.name === 'image') && (lastChange.type && lastChange.type === 'remove')) {
                // The graveyard tree root
                const previousImageGraveyard = changes[0]

                if (!previousImageGraveyard) {
                    return;
                }

                // Root Element
                const root = previousImageGraveyard.position.root
                // Removed node
                const removedImageNode = root.getChild(0)
                // Removed image src
                const removedImageSrc = removedImageNode.getAttribute('src')
                // Call the callback
                return callback(removedImageSrc, removedImageNode)
            }
        })
    }
}
