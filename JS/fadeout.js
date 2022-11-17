/*! Fades out the whole page when clicking links */
const anchors = document.querySelectorAll('a');
for (let i = 0; i < anchors.length; i++) {
    const anchor = anchors[i];
    anchor.addEventListener('click', e => {
        e.preventDefault();
        
        let target = e.currentTarget.href;
        console.log("target is:");
        console.log(target);

        const main = document.querySelector('.main');
        main.classList.add('fadeOut');
        const linksBox = document.querySelector('.links-box');
        linksBox.classList.add('fadeOut');
        


        setTimeout(() => {
            window.location.href = target;
        }, 400)
    });
}