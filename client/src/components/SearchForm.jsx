import { useContext } from "react";
import { Context } from "../App";
import {observer} from 'mobx-react';
import NotesService from "../services/notes-service";

const SearchForm = observer(() => {
  const {store} = useContext(Context);

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const handleSearchKeyUp = (event) => {
    if (event.key === 'Backspace') {
      return;
    }
    if(store.search.length >= 1) {
      handleSearch(store.search);
    } else {
      return;
    }
  }

  const handleSearchKeyDown = (event) => {
    if (event.code == 'ENTER' && (store.search.length > 1)) {
      handleSearch(store.search);
    } else {
      return;
    }
  }

  const handleSearch = () => {
    store.setSelectedAuthor({value: 'Выбор автора', label: 'Выбор автора'})
    store.setSelectedPriority({value: 'Выбор приоритета', label: 'Выбор приоритета'})
    localStorage.setItem('searchvalue', store.search);
    store.setCurrentPageDefault()
    store.setSearchLoading(true)
    store.setLoading(true)
    store.setNoData(false)
    store.setNoDataTwo(false)
    store.setNoDataFour(false)
    try {
      store.settertNotes([])
      store.setNoDataTwo(false)
      setTimeout(async() => {
        const res = await NotesService.searchNotesByTitle(store.search);
        if (res.data.data.length <= 0) {
          store.settertNotes([])
          store.setNoData(false)
          store.setNoDataTwo(false)
          store.setNoDataFour(false)
          if (store.nodata === false && store.nodatafour === false && store.nodatatwo === false && store.notes.length <= 0) {
            store.setLoading(false)
            store.setNoDataFour(true)
            store.setTotalPageDefault()
          }
        } else {
          store.setNoData(false)
          store.setNoDataTwo(false)
          store.setNoDataFour(false)
          if (store.nodata === false && store.nodatatwo === false && store.nodatafour === false) {
            store.setLoading(false)
            store.settertNotes(res.data.data)
            store.setTotalPage(res.data.pages)
            return res.data.data
          }
        }
      }, 500)
    } catch (e) {
      console.log(e)
    } finally {
      store.setSearchLoading(false)
    }
  }

  return (
  <div className="form-search-container" style={{marginTop: "1rem"}}>
    <form id="input-form" onSubmit={(e) => handleSubmit(e)} onKeyDown={(e) => handleSearchKeyDown(e)} onKeyUp={(e) => handleSearchKeyUp(e)} className="app-header-search">
      <input
      onChange={(e) => store.setSearch(e.target.value)}
      value={store.search}
      type="text"
      className="form-control bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-1 px-2 block appearance-none leading-normal focus:border-indigo-300"
      name="search"
      id="search"
      placeholder="введите текст..."
      />
      <button
      style={{display: "none"}}
      type="submit"
      className="search-btn">
        Найти
      </button>
    </form>
  </div>
  )
})

export default SearchForm
