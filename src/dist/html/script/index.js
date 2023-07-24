// This is real renderer process

document.addEventListener("DOMContentLoaded", function () {
	main();
	//addAll();
	//cleanPage();
});

async function main()
{
	var pages = Array.from( document.querySelectorAll( ".page" ) );
	let pageCount = pages.length;
	const pageHeight = pages[ 0 ].clientHeight;

	for( let index = 0; index < pageCount; index++ )
	{
		let contentHeight = pages[ index ].scrollHeight;

		if( pageHeight < contentHeight )
		{
			const overHeightElements = [];
			const childrenElements = Array.from( pages[ index ].children );
			
			childrenElements.forEach( function ( element ) {
				if( pageHeight <= element.offsetHeight )
				{
					overHeightElements.push( element );
				}
			});
			
			overHeightElements.forEach( function ( element ) {
				element.parentNode.removeChild( element );
			});
			
			const newPage = document.createElement( "div" );
			newPage.classList.add( "page" );
			overHeightElements.forEach( function ( element ) {
				newPage.appendChild( element );
			});
			//##################################################################
			pages[ index ].parentNode.insertBefore( newPage, pages[ index ].nextSibling );
			//##################################################################
			pageCount++;

			//pages = Array.from( document.querySelectorAll( ".page" ) );
			console.log( pages );
		}
	}
}


function addAll()
{
	addDate();
	appPageNumbers();
	addFileName();
}

// Add page numbers to all page class elements
function appPageNumbers()
{
	const pages = document.querySelectorAll( ".page" );
	pages.forEach( function ( page, index ) {
		const pageNumber = document.createElement( "div" );
		pageNumber.classList.add( "page-number" );
		pageNumber.innerHTML = index + 1;
		page.appendChild( pageNumber );
	});
}

// Add current date and time
function addDate()
{
	const date = new Date();
	const page = document.querySelectorAll( ".page" );
	page.forEach( function ( page ) {
		const dateElement = document.createElement( "div" );
		dateElement.classList.add( "print-date" );
		dateElement.innerHTML = date.toLocaleString();
		page.insertBefore( dateElement, page.firstChild );
	});
}

function addFileName()
{
	const page = document.querySelectorAll( ".page" );
	page.forEach( function ( page ) {
		const fileName = document.createElement( "div" );
		fileName.classList.add( "file-name" );
		fileName.innerHTML = document.title;
		page.insertBefore( fileName, page.firstChild );
	});
}

function cleanPage()
{
	const pages = document.querySelectorAll( ".page" );
	pages.forEach( function ( page ) {
		if( page.clientHeight === 0 )
		{
			page.parentNode.removeChild( page );
		}
	});
}


// End of script