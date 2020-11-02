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

            // get any removed image node
            const removedFirstImageNode = changes.find(change => (change.type === 'insert' && change.name === 'image'))

            // get root of removed image node
            const root = removedFirstImageNode.position.root;

            // get the child count of root
            const childCount = root.childCount

            // get all removed child nodes
            const childNodes = [];

            for (let i = 0; i < childCount; i++){
                childNodes.push(root.getChild(i))
            }

            // get all removed images node
            const removedImageNodes = childNodes.filter(node => {
                return (node.name === 'image')
            })

            // let removed images src
            const removedImagesSrc = [];

            removedImageNodes.forEach(node => {
                const src = node.getAttribute('src')
                removedImagesSrc.push(src)
            })

            // Call the callback
            return callback(removedImagesSrc, removedImageNodes)
        })
    }
}
