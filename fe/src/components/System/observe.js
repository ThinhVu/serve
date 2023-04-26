function track(options, handleEntry) {
  if (options instanceof HTMLElement) {
    options = {
      root: options,
      rootMargin: "0px",
      threshold: 0.75,
    }
  }
  return new IntersectionObserver((entries, observer) => entries.forEach(entry => handleEntry(entry, observer), options))
}

export default track;
