// This is real renderer process

document.addEventListener("DOMContentLoaded", async function () {
	await main();
});

async function main()
{
	var pages = Array.from( document.querySelectorAll( ".page" ) );
	pageCount = pages.length;
	const pageHeight = pages[ 0 ].clientHeight;

	for( let index = 0; index < pages.length; index++ )
	{
		var contentHeight = pages[ index ].scrollHeight;
		console.log( "contentHeight: " + contentHeight );
		let overHeightElements = [];

		if( pageHeight <= contentHeight )
		{
			let childrenElements = Array.from( pages[ index ].children );
			let accumulatedHeight = 0;
	
			childrenElements.forEach( function ( element ) {
				accumulatedHeight += element.offsetHeight;
	
				if( pageHeight <= accumulatedHeight )
				{
					overHeightElements.push( element );
				}
			});
	
			const newPage = document.createElement( "div" );
			newPage.classList.add( "page" );
			overHeightElements.forEach( function ( element ) {
				newPage.appendChild( element );
			});

			//newPage.innerHTML = "<h1>TEST</h1>";
			//pages.splice( index + 1, 0, newPage );
			pages[ index ].parentNode.insertBefore( newPage, pages[ index + 1 ] );

			console.log( newPage.innerHTML );
		}
	}

	return Promise.resolve();
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