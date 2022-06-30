$(document).ready(function () {

    $('#submit').click(function () {
        var titleInp = document.forms['addPost_form']['title'].value;
        var contentInp = document.forms['addPost_form']['content'].value;
        var upvotesInp = document.forms['addPost_forms']['upvotes'].value;
        var authorInp = document.forms['addPost_forms']['author'].value;
        var imgInp = document.forms['addPost_forms']['image'].value;

        let post = {
            title: titleInp,
            content: contentInp,
            upvotes: upvotesInp,
            author: authorInp,
            image: imgInp
        }

        $.get('/submit-post', post, function(data, status){
            $('#cardPosts').append(data);
        })
    });
})