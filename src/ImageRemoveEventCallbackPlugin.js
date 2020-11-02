import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageRemoveEvent from './ImageRemoveEvent'

export default class ImageRemoveEventCallbackPlugin extends Plugin {
    static get requires() {
        return [Image];
    }

    init() {
        const editor = this.editor
        const configuration = this.editor.config.get('imageRemoveEvent');
        const documentationURL = 'https://github.com/shibbirweb/ckeditor-5-image-remove-event-plugin'

        // Validate has configuration
        if (!configuration) {
            console.warn('CKEditor5 Image Remove Event Plugin : configuration is not defined.')
            console.warn(`View configuration documentation: ${documentationURL}`)
            return;
        }

        // validate configuration type
        if (typeof configuration !== 'object') {
            console.info(`CKEditor5 Image Remove Event Plugin: Configuration should be an object. See documentation at: ${documentationURL}`)
            console.warn('CKEditor5 Image Remove Event Plugin: Configuration is not valid.')
        }

        const {callback} = configuration

        // validate event callback
        if (!callback || {}.toString.call(callback) !== '[object Function]') {
            console.info(`CKEditor5 Image Remove Event Plugin: Configuration callback property should be a function. See documentation at: ${documentationURL}`)
            console.error('CKEditor5 Image Remove Event Plugin: Callback property is not valid function.')
        }

        return new ImageRemoveEvent(editor, configuration)
    }
}
