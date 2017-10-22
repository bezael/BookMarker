//Listen for form submit
document.getElementById('FrmMain').addEventListener('submit', saveBookMark);

function saveBookMark(e){
	e.preventDefault();
	const siteName = document.getElementById('TxtName').value;
	const siteUrl = document.getElementById('TxtSiteUrl').value;	

	let bookMark = {
		name: siteName,
		url: siteUrl
	}

	if(!validateForm(siteName, siteUrl)){
		return false;
	}
	// Local Storage
		let bookMarkArray = [];
	if (localStorage.getItem('myBookMarks') === null) {
		bookMarkArray.push(bookMark);
		localStorage.setItem('myBookMarks', JSON.stringify(bookMarkArray));	
	}else{
		bookMarkArray = JSON.parse(localStorage.getItem('myBookMarks'));
		bookMarkArray.push(bookMark);
		localStorage.setItem('myBookMarks', JSON.stringify(bookMarkArray));
	}
	document.getElementById('FrmMain').reset();
	fetchBookmarks();	
}

function fetchBookmarks(){
	let bookMarks = JSON.parse(localStorage.getItem('myBookMarks'));
	let bookmarksResults = document.getElementById('bookmarksResults');
		bookmarksResults.innerHTML= '';
		JSON.stringify(bookMarks)
		document.getElementById('title-bookmarks').style.display='block';
		bookMarks.forEach(function(item){
			bookmarksResults.innerHTML += `
			
			<div class="alert alert-dismissible alert-success">
				<h3>${item.name}</h3>
				<a class="btn btn-default btn-xs" target="_blank" href="${item.url}">Visit</a>
				<a class="btn btn-danger btn-xs" onclick="deleteBookmark('${item.url}')"  href="#">Delete</a>	
			</div>`;		
		});	
}

function deleteBookmark(url){
	let i=0;
	let bookMarks = JSON.parse(localStorage.getItem('myBookMarks'));
		bookMarks.forEach((item)=>{			
			if(item.url==url){
				bookMarks.splice(i,1);
			}
			i++;
		});
	localStorage.setItem('myBookMarks',JSON.stringify(bookMarks));	
	fetchBookmarks();
}

function validateForm(siteName, siteUrl){
	if(!siteName || !siteUrl){
		alert('Please fill in the form');
		return false;
	}
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert('Please use a valid URL');
		return false;
	}
	return true;
}