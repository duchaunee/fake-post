const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const likeEL = $('.like')
const selectFeeling = $('.select-feeling')
const itemFeeling = $$('.item-feeling')
const likeWrapper = $('.like-wrapper')
const text = $('.like-wrapper span')
const writeComment = $('.write-comment')

const overlay = $('.overlay');
const name = $('.wrapper-your-name input');
const submit = $('.wrapper-your-name button');
let nameVal;
let countComment = 3;

let check = false
likeEL.addEventListener('click', function(e) {
    if (check) {
        console.log(123);
    }
    this.classList.toggle('active');
})

itemFeeling.forEach( (item, idx) => {
    item.addEventListener('click', function(e) {
        check = true;

        let like = likeEL.querySelector('.fa-thumbs-up');
        if (like) like.remove();
        
        let imgELs = $$('.img-active')
        if (imgELs) {
            imgELs.forEach( item => {
                item.remove();
            })
        }

        let imgEL = document.createElement('img');
        imgEL.setAttribute('class', 'img-active')
        text.innerText = `Haha`
        text.style.color = 'orange'

        likeEL.insertAdjacentElement('afterbegin', imgEL)
        imgEL.src = `./feeling-img/haha${idx}.png`;

        console.log(check);
    })
})

overlay.addEventListener('submit', (e) => {
    e.preventDefault();

    nameVal = name.value.trim();
    if (nameVal.length > 0) {
        overlay.style.display = 'none';
    }
})

function createComment( textComment ) {
    UpdateCountComment();
    let li = document.createElement('li')
    li.setAttribute('class', 'item');
    li.innerHTML = `
    <div class="item-info">
            <div class="comment-avt">
                <img src="./avt.jpg" alt="">
            </div>
            <div class="right">
                <div class="comment-text-name">
                    <a class="comment-name">${nameVal}</a>
                    <div class="comment-text">${textComment}</div>
                </div>
                <div class="items-react">
                    <div class="row-6">
                        <a class="item-react item-react-like">Like</a>
                        <a class="item-react item-react-reply">Reply</a>
                        <a class="item-react item-react-hour">1 m</a>
                    </div>
                </div>
            </div>
        </div>`

        $('.wrapper-comment ul').insertAdjacentElement('afterbegin', li)
}

function solveCommentPC() {
    writeComment.addEventListener('submit', (e) => {
        e.preventDefault();

        let text = $('.write input')
        createComment(text.value.trim());
        text.value = ""
    })
}

function myFunctionMediaQuery(x) {
    if (x.matches) { // If media query matches
        $('.write input').addEventListener('input', (e) => {
            if (e.target.value.trim().length > 0) {
                $('.write input').style.width = '90%'
                $('.write .sent').style.display = 'block'
            }
            else {
                $('.write input').style.width = '100%'
                $('.write .sent').style.display = 'none'
            }
        })

        $('.amount-react').querySelector('a').innerText = '1,2k'
        writeComment.addEventListener('submit', (e) => {
            e.preventDefault();

            let text = $('.write input')
            if (text.value.trim().length > 0) {
                createComment(text.value.trim());
                $('.write input').style.width = '100%'
                $('.write .sent').style.display = 'none'
                text.value = ""
            }
        })
    }
}

function UpdateCountComment() {
    countComment++;
    $('.amount-comment a').innerText = `${countComment} comments`
}

solveCommentPC()

var x = window.matchMedia("(max-width: 740px)")
myFunctionMediaQuery(x) // Call listener function at run time
x.addListener(myFunctionMediaQuery) // Attach listener function on state changes
