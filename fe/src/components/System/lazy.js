import observe from '@/components/System/observe.js';

const lazy = observe(null, (entry, observer) => {
  if (entry.isIntersecting) {
    const {target} = entry;
    observer.unobserve(target);
    target.src = target.getAttribute('data-src');
    target.removeAttribute('data-src');
  }
});

export default lazy;
