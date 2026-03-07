export function onImagesLoaded(
  images: ArrayLike<HTMLImageElement>,
  cb: () => any,
) {
  let loaded = 0

  for (const image of Array.from(images)) {
    if (image.complete && image.naturalWidth > 0) {
      loaded++

      if (loaded === images.length) {
        cb()
      }
    } else {
      image.addEventListener('load', () => {
        loaded++

        if (loaded === images.length) {
          cb()
        }
      })
    }
  }
}
