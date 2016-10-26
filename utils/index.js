function loadJS(url){
  return new Promise((resolve, reject) => {
    let s = document.createElement('script');
    s.src = url;
    s.onload = resolve;
    s.onerror = reject;
    let x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
  });
}

module.exports = {
  loadJS: loadJS
};