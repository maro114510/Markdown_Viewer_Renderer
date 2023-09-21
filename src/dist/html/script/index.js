// This is real renderer process

document.addEventListener("DOMContentLoaded", function () {
	main();
});

async function main()
{
	var pages = document.querySelectorAll( ".page" );
	//A4の高さpx
	var pageHeight = 1122;

	for(let i = 0; i < pages.length; i++)
	{
		var page = pages[i];

		if( !page )
		{
			break;
		}

		while( page )
		{
			let pageContentScrollHeight = page.scrollHeight;
			console.log( pageContentScrollHeight );
			let overflowContents = [];
			//pageHeightより大きい場合はpageのdivを作り、分割
			if( pageContentScrollHeight > pageHeight )
			{
				//pageHeightまでpageContentScrollHeightを減らす
				while( pageContentScrollHeight > pageHeight )
				{
					//削除しながらpageContentScrollHeightを減らす
					var overflowContent = page.lastElementChild;
					page.removeChild( overflowContent );
					pageContentScrollHeight = page.scrollHeight;
					//先入れ後出し
					overflowContents.push( overflowContent );
				}

				//pageのdivを作り、分割したoverflowContentsを追加
				var newPage = document.createElement( "div" );
				newPage.classList.add( "page" );
				//先入れ後出し
				for( var j = overflowContents.length - 1; j >= 0; j-- )
				{
					var overflowContent = overflowContents[j];
					newPage.appendChild( overflowContent );
				}
				console.log( page );
				console.log( newPage );
				page.parentNode.insertBefore( newPage, page.nextSibling );
			}

			page = page.nextSibling;
		}
	}
}


// End of script