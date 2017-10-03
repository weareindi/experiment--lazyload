/**
 * Lozyload
 */
;(function() {
    /**
     * Minimal check for browser support
     * Fail quickly and silently
     */
    if (!window.MutationObserver || !window.IntersectionObserver) {
        return;
    }

    /**
     * Check if lozyload already exists
     */
    if (!window.lozyload) {
        window.lozyload = {};
    }

    /**
     * Scope lozyload to self
     */
    var self = window.lozyload;

    /**
     * Prepare images object
     */
    self.img = {};

    /**
     * Prepare functions object
     */
    self.fn = {};

    /**
     * Prepare observers object
     */
    self.ob = {};

    /**
     * Register Mutation Observer
     * Listen for changes to the document
     */
    self.fn.registerMutationObserver = function() {
        self.ob.mutationObserver = new MutationObserver(function() {
            self.fn.processImgElements();
        });

        self.ob.mutationObserver.observe(document, {
            attributes: false,
            childList: true,
            characterData: false,
            subtree: true
        });
    }

    /**
     * Process Image Elements
     */
    self.fn.processImgElements = function() {
        var imageElements = document.querySelectorAll('img:not([lozyload-src])');
        for (var i = 0; i < imageElements.length; i++) {
            var imageElement = imageElements[i];
            var imageElementSrc = imageElement.src;

            imageElement.setAttribute('lozyload-src', imageElementSrc);
            imageElement.removeAttribute('src');

            if (self.fn.processImageContainers) {
                self.fn.processImageContainers();
            }
        }
    }

    /**
     * Execute
     */
    self.fn.registerMutationObserver();
})();
