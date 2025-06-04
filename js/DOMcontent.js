class DomModuls {
    setElement = (name) => document.querySelector(name);
    createNewElement = ({ tag = 'div', attributes = {}, styles = {}, text = '', parent = document.body }) => {
        let newElement = document.createElement(tag);
        for (const [key, value] of Object.entries(attributes)) newElement.setAttribute(key, value);
        Object.assign(newElement.style, styles);
        if (text) newElement.textContent = text;
        parent.appendChild(newElement);
        return newElement;
    }
}

const dm = new DomModuls;
const soundFile = chrome.runtime.getURL('../audios/shit_voice.mp3');
const audio = new Audio(soundFile);

dm.createNewElement({
    tag: 'div',
    styles: {
        backgroundColor: 'rgb(100, 100, 100)', 
        margin: '0, 0',
        top: '5%',
        left: '5%',
        transform: 'translateY(0%)',
        width: '1200px',
        height: '600px',
        position: 'fixed',
        "z-index": 10000,
        'border-radius': '10px'
    },
    attributes: { id: 'window-foundation' },
    parent: dm.setElement('body')
});

dm.createNewElement({
    tag: 'div',
    styles: {
        backgroundColor: 'rgb(255, 0, 0)',
        margin: '0 0',
        top: 'calc(0.5vh + 50px)',
        transform: 'translateX(50%), translateY(50%)',
        width: '1200px',
        height: '550px',
        position: 'fixed',
        'border-radius': '0px 0px 10px 10px'
    },
    attributes: { id: 'window-main' },
    parent: dm.setElement('#window-foundation')
});

dm.createNewElement({
    tag: 'p',
    styles: {
        color: 'rgb(255, 255, 255)',
        margin: '0 0'
    },
    text: '管理局からの警告です',
    parent: dm.setElement('#window-foundation')
})

dm.createNewElement({
    tag: 'h1',
    styles: {
        margin: '0 0',
        color: 'rgb(255, 255, 255)',
        top: 'calc(0.5vh + 75px)',
        left: 'calc(0.5vw + 50px)'
    },
    attributes: { id: 'warning-text' },
    text: '今すぐにこのサイトのブラウジングをやめてください',
    parent: dm.setElement('#window-main')
});

dm.createNewElement({
    tag: 'br',
    parent: dm.setElement('#window-main')
});

dm.createNewElement({
    tag: 'p',
    styles: {
        margin: '0, 0',
        color: 'rgb(255, 255, 255)',
        top: 'calc(0.5vh + 125px)',
        left: 'calc(0.5vw + 50px)'
    },
    text: 'あなたのPCを保護するためにこのサイトを閉じてください',
    attributes: { id: 'warning-text-sub' },
    parent: dm.setElement('#window-main')
})

dm.createNewElement({
    tag: 'span',
    styles: {
        margin: '0, 0',
        bottom: '0',
        right: '0',
        width: 'auto',
        height: 'auto',
        top: 'calc(0.5vh + 225px)',
        left: 'calc(0.5vw + 50px)'
    },
    attributes: { id: 'buttons' },
    parent: dm.setElement('#window-main')
})

dm.createNewElement({
    tag: 'button',
    text: 'はい、閉じます',
    styles: {
        margin: '8px, 0'
    },
    attributes: {
        id: 'button-understand', 
        class: 'btn btn-solid-silver'
    },
    parent: dm.setElement('#buttons')
})

dm.createNewElement({
    tag: 'button',
    text: '無視します',
    styles: {
        margin: '8px, 0'
    },
    attributes: {
        id: 'button-rejection',
        class: 'btn btn-solid-silver'
    },
    parent: dm.setElement('#buttons')
})

dm.createNewElement({
    tag: 'p',
    styles: {
        width: '60px',
        height: '50px',
        right: 0,
        top: 0,
        borderRadius: '0px 10px 0px 0px',
        position: 'fixed',
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(175, 0, 0)',
        margin: '0 0 0 0',
        'font-size': '30px',
        'text-align': 'center'
    },
    attributes: {
        id: 'mark-batsu',
    },
    text: '×',
    parent: dm.setElement('#window-foundation')
})

dm.createNewElement({
    tag: 'style',
    text: `button.btn-solid-silver {
            color: #000;
            border-top: 4px solid #d8dcdc;
            border-right: 4px solid #666;
            border-bottom: 4px solid #333;
            border-left: 4px solid #868888;
            border-radius: 0;
            background-image: -webkit-linear-gradient(135deg, #333 0%, #868888 20%, #d8dcdc 34%, white 53%, #666 100%);
            background-image: linear-gradient(-45deg, #333 0%, #868888 20%, #d8dcdc 34%, white 53%, #666 100%);
            text-shadow: 0 0 5px #fff, 0 0 5px #fff, 0 0 5px #fff, 0 0 5px #fff, 0 0 5px #fff;
        }
      
        button.btn-solid-silver:hover {
            text-shadow: 0 0 7px #fff, 0 0 7px #fff, 0 0 7px #fff, 0 0 7px #fff, 0 0 7px #fff, 0 0 7px #fff, 0 0 7px #fff, 0 0 7px #fff;
        }`,
      parent: dm.setElement('head')

});

document.addEventListener('click', e => {
    if (e.target.id === 'button-understand') chrome.runtime.sendMessage({ action: "closeTab" });
    else if (e.target.id === 'button-rejection') audio.play();
    else console.log('not found' + e.target.id);
})