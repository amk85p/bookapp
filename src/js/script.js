{
  ('use strict');
  // Przygotuj referencję do szablonu oraz listy .books-list.
  const select = {
    templateOf: {
      bookList: '#template-book',
    },
    containerOf: {
      books: '.books-list',
      book: '.book',
      bookImage: 'book__image',
      bookFilters: '.filters',
      
    },
    classNames: {
      favoriteBook: 'favorite',
    },
  };
  const templates = {
    booksList: Handlebars.compile(
      document.querySelector(select.templateOf.bookList).innerHTML
    ),
  };

  class BooksList {
    constructor() {
      const thisBooksList = this;
      thisBooksList.getElements();
      thisBooksList.renderBooks();
      thisBooksList.initActions();
      thisBooksList.determineRatingBgc()
    }

    initActions() {
      const thisBooksList = this;
      console.log(thisBooksList);
      thisBooksList.favoriteBooks = [];

      thisBooksList.booksContainer.addEventListener(
        'dblclick',
        function (event) {
          event.preventDefault();
          console.log(thisBooksList.booksContainer);

          thisBooksList.bookClicked = event.target.offsetParent;
          console.log('bookClicked ', thisBooksList.bookClicked);
          // thisBooksList.e = document.getElementsByClassName(
          //   select.containerOf.bookImage
          // )[thisBooksList.bookId - 1];
          // console.log('e:', thisBooksList.e);

          if (thisBooksList.bookClicked.classList.contains('book__image')) {
            thisBooksList.bookId =
              thisBooksList.bookClicked.getAttribute('data-id');
            console.log(thisBooksList.bookId, thisBooksList.bookClicked);

            if (thisBooksList.favoriteBooks.includes(thisBooksList.bookId)) {
              console.log('thisBooksList.bookId:', thisBooksList.bookId);

              // e.classList.toggle('favorite');
              console.log('favoriteBooks:', thisBooksList.favoriteBooks);
              thisBooksList.bookClicked.classList.remove('favorite');
              const index = thisBooksList.favoriteBooks.indexOf(
                thisBooksList.bookId
              );
              console.log(index);
              thisBooksList.favoriteBooks.splice(index, 1);
            } else {
              thisBooksList.bookClicked.classList.add('favorite');
              thisBooksList.favoriteBooks.push(thisBooksList.bookId);
            }
            console.log('favoriteBooks:', thisBooksList.favoriteBooks);
          }
        }
      );
      thisBooksList.filters = [];
      thisBooksList.booksFilters.addEventListener('click', function (event) {
        thisBooksList.filterClicked = event.target;

        if (thisBooksList.filterClicked.name == 'filter') {
          console.log(thisBooksList.filterClicked);
          if (thisBooksList.filterClicked.checked) {
            thisBooksList.filters.push(thisBooksList.filterClicked.value);
          } else {
            const index = thisBooksList.filters.indexOf(
              thisBooksList.filterClicked.value
            );
            thisBooksList.filters.splice(index, 1);
          }
        }
        thisBooksList.filterBooks();
        console.log('thisBooksList.filters:', thisBooksList.filters);
      });
    }

    filterBooks() {
      const thisBooksList = this;
      // thisBooksList.filters = [];
      console.log('thisBooksList.filters:', thisBooksList.filters);
      for (let element of dataSource.books) {
        let shouldBeHidden = false;

        for (let filter of thisBooksList.filters) {
          // details.adults = true;
          if (element.details[filter]) {
            shouldBeHidden = true;
            console.log(element.id);

            break;
          }
        }
        if (shouldBeHidden) {
          document
            .querySelector('.book__image[data-id="' + element.id + '"]')
            .classList.add('hidden');
        } else {
          document
            .querySelector('.book__image[data-id="' + element.id + '"]')
            .classList.remove('hidden');
        }
        console.log(shouldBeHidden);
        console.log(element);
      }
    }

    getElements() {
      const thisBooksList = this;
      thisBooksList.booksContainer = document.querySelector(
        select.containerOf.books
      );
      console.log(thisBooksList.booksContainer);

      thisBooksList.booksFilters = document.querySelector(
        select.containerOf.bookFilters
      );
      console.log('thisBooksList.booksFilters:', thisBooksList.booksFilters);

    
    }

    renderBooks() {
      const thisBooksList = this;
 
    
      for (let bookId of dataSource.books) {
     
        const ratingBgc = thisBooksList.determineRatingBgc(bookId.rating);
        bookId.ratingBgc = ratingBgc;
        const ratingWidth = (bookId.rating) * 10;
        bookId.ratingWidth = ratingWidth;
        console.log(ratingBgc, ratingWidth, bookId );
        
        const generatedHTML = templates.booksList(bookId);
        // console.log(generatedHTML, dataSource.books, bookId);
      
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        // console.log(generatedDOM);
      
        thisBooksList.booksContainer.appendChild(generatedDOM);
        // console.log('init render');
      }
    }
    determineRatingBgc(rating) {
      const thisBooksList = this;
     
      if (rating <7){
        return   '#f1da36';
      } if (rating <= 9){
        return   '#f222';
      } if (rating <= 10){
        return   '#e999 ;';
      }
      console.log(thisBooksList);
      // console.log(determineRatingBgc());
   
    }
  }


  const app = new BooksList();
}
