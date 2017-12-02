(function($){$(document).ready(() => {
  // lazily load all the images to the hidden-images once the dom is ready

  // constructor ImageMover object
  function ImageMover() {
    this._numberOfImages = 18;
    this._areAllImagesLoaded = false; // boolean flag for when all the images have been loaded from above
    this._imageIncrementer = 1; // incrementer of images that are moved from hidden to showing

    this.initialize = () => {
      this.loadImages();
    };

    /*
     * Moves image from hidden to the body container
     */
    this.moveImage = () => {
      const $image = $(".hidden-images img")[this._imageIncrementer];
      const $imageUpdated = $($image).clone().attr("style", this.randomCoorindateStyles($image));
      $(".body-container").append($imageUpdated);
      if (this._imageIncrementer === this._numberOfImages - 1) {
        this._imageIncrementer = 1;
      } else {
        this._imageIncrementer++;
      }
    }

    /*
     * Lazily loads the images into the hidden-images div class
     */
    this.loadImages = () => {
      const $hiddenImages = $(".hidden-images");
      for (let i = 1; i <= this._numberOfImages; i++) {
        const templateStr = `<img class="image" src="./images/${i}.jpg" />`;
        $hiddenImages.append(templateStr);
      }
    }

    /*
     * Randomly generate coordinates for top and left corners of an image
     */
    this.randomCoorindateStyles = (imageElement) => {
      // find the width and height of the image first
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const randomLeft = getRandomArbitrary(0, windowWidth - (imageElement.width/2));
      const randomTop = getRandomArbitrary(0, windowHeight - (imageElement.height/2));
      const inlineStyles = `left:${randomLeft}px;top:${randomTop}px`;
      return inlineStyles;
    }
  };


  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  const lazyLoader = new ImageMover();
  lazyLoader.initialize();

  // click handlers
  $(".js-body").on("click", () => {
    lazyLoader.moveImage();
  });
});
})(jQuery);
