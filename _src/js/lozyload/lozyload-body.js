/**
 * Lozyload
 */
;(function() {
    /**
     * Check Browser Feature Support
     */
    if (!window.MutationObserver) {
        console.error('This browser doesn\'t support the \'MutationObserver API\' (https://developer.mozilla.org/en/docs/Web/API/MutationObserver)');
        console.log('Caniuse: http://caniuse.com/#feat=mutationobserver');
        console.log('MutationObserver Polyfills are available');
    }

    if (!window.IntersectionObserver) {
        console.error('This browser doesn\'t support the \'IntersectionObserver API\' (https://developer.mozilla.org/en/docs/Web/API/Intersection_Observer_API)');
        console.log('Caniuse: http://caniuse.com/#feat=intersectionobserver');
        console.log('IntersectionObserver Polyfills are available');
    }

    if (!window.MutationObserver || !window.IntersectionObserver) {
        return;
    }

    /**
     * Check if lozyload already exists
     */
    if (!window.lozyload) {
        console.error('Lozyload says: Did you include the lozyload-head.js?');
        return;
    }

    /**
     * Scope lozyload to self
     */
    var self = window.lozyload;

    /**
     * Register the Intersection Observer
     */
    self.fn.registerIntersectionObserver = function() {
        self.ob.intersectionObserver = new IntersectionObserver(function(intersections) {
            for (var i = 0; i < intersections.length; i++) {
                // If the element is inview
                if (intersections[i].isIntersecting) {
                    // Load the image
                    self.fn.loadImage(intersections[i].target);
                }
            }
        },{
            root: null,
            rootMargin: '0px 0px',
            threshold: 0.5 // At least half the image needs to be inview
        });
    }


    /**
     *
     */
    self.fn.registerIntersectionObserverElement = function(element) {
        self.ob.intersectionObserver.observe(element);
    }

    /**
     *
     */
    self.fn.processImageContainers = function() {
        var imageElements = document.querySelectorAll('img:not([lozyload-processed])');

        for (var i = 0; i < imageElements.length; i++) {
            var imageElement = imageElements[i];
            var imageElementParent = imageElement.parentNode;
            var imageElementWrapper = document.createElement('div');
            imageElementWrapper.classList.add('lozyload');
            imageElementWrapper.appendChild(imageElement);

            if (imageElement.width && imageElement.height) {
                imageElementWrapper.style.paddingTop = (imageElement.height / imageElement.width) * 100 + '%';
            }

            imageElementParent.appendChild(imageElementWrapper);

            self.fn.registerIntersectionObserverElement(imageElementWrapper);

            imageElement.setAttribute('lozyload-processed', true);
        }
    }

    /**
     * Load the images
     */
    self.fn.loadImage = function(imageWrapper) {
        // Fetch img element in
        var image = imageWrapper.querySelector('img:not([src])');

        // Ignore if no relevant img element is found in the wrapper.
        if (!image) {
            return;
        }

        // Prepare the onload event for after the src has been applied
        image.onload = function() {
            imageWrapper.classList.add('lozyload--loaded');
        }

        // Reset src back to original
        image.setAttribute('src', image.getAttribute('lozyload-src'));
    }

    /**
     * Execute
     */
    window.onload = function() {
        self.fn.registerIntersectionObserver();
        self.fn.processImageContainers();
    }

})();
