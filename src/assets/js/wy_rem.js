/*
 * @version:
 * @Author: LHF
 * @Date: 2021-05-24 15:01:28
 * @LastEditors: LHF
 * @LastEditTime: 2021-05-24 15:43:31
 */
(function(doc, win) {
  // console.log(doc.documentElement);
  var docEl = doc.documentElement,
    isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
    dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
    dpr = 1,
    scale = 1 / dpr,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  docEl.dataset.dpr = dpr;
  var metaEl = doc.createElement('meta');
  metaEl.name = 'viewport';
  metaEl.content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale;
  docEl.firstElementChild.appendChild(metaEl);
  // debugger
  var recalc = function() {
    // console.log(docEl.clientWidth, 'ccccccccccccc');
    var width = docEl.clientWidth;
    if (width / dpr > 765) {
      width = 1200 * dpr;
    }
    // 乘以100，px : rem = 100 : 1
    docEl.style.fontSize = 100 * (width / 1920) + 'px';
    console.log(docEl.style);
    console.log(docEl);
  };
  recalc();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
})(document, window);
