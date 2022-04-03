window.addEventListener('load', function() {
    let ul = document.querySelector('ul')
    let div = document.querySelector('.focus')
    let bu_l = this.document.querySelector('.arrow-l')
    let bu_r = document.querySelector('.arrow-r')
    let ol = div.querySelector('ol')
    div.addEventListener('mouseenter', function(e) {
        bu_l.style.display = 'block';
        bu_r.style.display = 'block';
        clearInterval(window.timer)
    })
    div.addEventListener('mouseleave', function(e) {
        bu_l.style.display = 'none';
        bu_r.style.display = 'none';
        window.timer = setInterval(function() {
            bu_r.click()
        }, 2000)
    })

    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var step = (target - obj.offsetLeft) > 0 ? Math.ceil((target - obj.offsetLeft) / 10) : Math.floor((target - obj.offsetLeft) / 10);
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer)
                if (callback)
                    callback()
            }
            obj.style.left = obj.offsetLeft + step + 'px'
        })
    }
    for (i = 0; i < ul.children.length; ++i) {
        let li = this.document.createElement('li');
        li.setAttribute('key', i);
        li.addEventListener('click', function(e) {
            for (i = 0; i < ol.children.length; ++i) {
                ol.children[i].className = ''
            }
            this.className = 'current'
            console.log(div.offsetWidth)
            animate(ul, -this.getAttribute('key') * div.offsetWidth)
        })
        ol.appendChild(li);
    }
    ol.children[0].className = 'current'
    let first = ul.children[0].cloneNode(true)
    ul.appendChild(first)

    let flag = true
    bu_r.addEventListener('click', function() {
        if (flag) {
            flag = false
            temp = ol.querySelector('.current').getAttribute('key') * 1
            temp += 1
            console.log(temp)
            animate(ul, -temp * div.offsetWidth, () => { flag = true })
            if (temp == ul.children.length - 1) {
                console.log('OK')
                ul.style.left = 0 + 'px'
                temp = 0
            }
            for (i = 0; i < ol.children.length; ++i) {
                ol.children[i].className = ''
            }
            ol.children[temp].className = 'current'
        }
    })
    bu_l.addEventListener('click', function() {
        if (flag) {
            flag = false
            let temp = ol.querySelector('.current').getAttribute('key') * 1
            temp = temp > 0 ? temp - 1 : ol.children.length - 1
            animate(ul, -temp * div.offsetWidth, () => { flag = true })

            for (i = 0; i < ol.children.length; ++i) {
                ol.children[i].className = ''
            }
            ol.children[temp].className = 'current'
        }
    })
    window.timer = setInterval(function() {
        bu_r.click()
    }, 2000)

})